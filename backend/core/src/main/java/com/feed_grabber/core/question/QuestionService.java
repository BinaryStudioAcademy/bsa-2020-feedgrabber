package com.feed_grabber.core.question;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.question.dto.*;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.QuestionCategoryRepository;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireOrderedDto;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.questionnaire2question.QuestionQuestionnaireRepository;
import com.feed_grabber.core.questionnaire2question.QuestionnaireQuestion;
import com.feed_grabber.core.sections.SectionRepository;
import com.feed_grabber.core.sections.exception.SectionNotFoundException;
import com.feed_grabber.core.sections.model.Section;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository quesRep;
    private final QuestionnaireRepository anketRep;
    private final QuestionCategoryRepository quesCategRep;
    private final CompanyRepository companyRep;
    private final QuestionQuestionnaireRepository qqRepo;
    private final SectionRepository sectionRepository;

    @Autowired
    public QuestionService(QuestionRepository quesRep,
                           QuestionnaireRepository anketRep,
                           QuestionCategoryRepository quesCategRep,
                           CompanyRepository companyRep,
                           QuestionQuestionnaireRepository qqRepo,
                           SectionRepository sectionRepository) {
        this.quesRep = quesRep;
        this.anketRep = anketRep;
        this.quesCategRep = quesCategRep;
        this.companyRep = companyRep;
        this.qqRepo = qqRepo;
        this.sectionRepository = sectionRepository;
    }

    public List<QuestionDto> getAll() {
        return quesRep.findAll()
                .stream()
                .map(QuestionMapper.MAPPER::questionToQuestionDto)
                .collect(Collectors.toList());
    }

    public List<QuestionDto> getAllByQuestionnaireId(UUID questionnaireId) {
        return quesRep.findAllByQuestionnaireId(questionnaireId)
                .stream()
                .map(QuestionMapper.MAPPER::questionToQuestionDto)
                .collect(Collectors.toList());
    }

    public Optional<QuestionDto> getOne(UUID id) {
        return quesRep
                .findById(id)
                .map(QuestionMapper.MAPPER::questionToQuestionDto);
    }


    public QuestionDto create(QuestionCreateDto dto) throws CompanyNotFoundException, QuestionnaireNotFoundException, SectionNotFoundException {
        var question = this.createModel(dto);
        return QuestionMapper.MAPPER.questionToQuestionDto(question);
    }

    @Transactional
    public Question createModel(QuestionCreateDto dto) throws CompanyNotFoundException, QuestionnaireNotFoundException, SectionNotFoundException {
        var question = Question.builder();

        var company = companyRep
                .findById(TokenService.getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);

        var category = findOrCreateCategory(dto.getCategoryTitle());

        question
                .category(category)
                .payload(dto.getDetails())
                .text(dto.getName())
                .type(dto.getType())
                .company(company)
                .isRequired(dto.isRequired());

        var savedQuestion = quesRep.save(question.build());
        if (dto.getQuestionnaireId().isPresent()) {
            var questionnaire =  anketRep.findById(dto.getQuestionnaireId().get())
                    .orElseThrow(QuestionnaireNotFoundException::new);

            var bindRow = QuestionnaireQuestion.getFromEntities(savedQuestion, questionnaire, dto.getIndex());
            this.qqRepo.save(bindRow);

            Section section;
            if (dto.getSectionId().isEmpty()) {
                section = this.sectionRepository.findByQuestionnaireIdAndTitle(questionnaire.getId(), questionnaire.getTitle());
            } else {
                section = this.sectionRepository.findById(dto.getSectionId().get())
                        .orElseThrow(SectionNotFoundException::new);
            }
            if (section.getQuestions().isEmpty()) {
                this.sectionRepository.updateFrom(section.getId(), 0);
                this.sectionRepository.updateTo(section.getId(), 0);
            } else {
                if(section.getFrom() > dto.getIndex()) { this.sectionRepository.updateFrom(section.getId(), dto.getIndex());}
                if(section.getTo() < dto.getIndex()) { this.sectionRepository.updateTo(section.getId(), dto.getIndex());}
            }
            this.sectionRepository.addQuestion(section.getId(), savedQuestion.getId());
        }
        return savedQuestion;
    }

    @Transactional
    public List<QuestionDto> addExistingQuestion(AddExistingQuestionsDto dto)
            throws QuestionNotFoundException, QuestionnaireNotFoundException {

        var questionnaire = anketRep
                .findById(dto.getQuestionnaireId())
                .orElseThrow(QuestionnaireNotFoundException::new);

        var bindRows = dto.getQuestions().stream()
                .map(q -> QuestionnaireQuestion.getFromEntities(
                        this.quesRep.findById(q.getId()).orElseThrow(),
                        questionnaire,
                        q.getIndex()))
                .collect(Collectors.toList());

        questionnaire.getQuestions().addAll(bindRows);

        dto.getQuestions()
                .forEach(q -> this.sectionRepository.addQuestion(dto.getSectionId(), q.getId()));

        try {
            anketRep.save(questionnaire);
        } catch (Throwable e) {
            throw new QuestionNotFoundException();
        }



        return questionnaire
                .getQuestions()
                .stream()
                .filter(bindRows::contains)
                .map(QuestionnaireQuestion::getQuestion)
                .map(QuestionMapper.MAPPER::questionToQuestionDto)
                .collect(Collectors.toList());
    }

    public QuestionDto update(QuestionUpdateDto dto)
            throws QuestionNotFoundException, CompanyNotFoundException {
        var question = this.updateModel(dto);
        return QuestionMapper.MAPPER.questionToQuestionDto(question);
    }

    public Question updateModel(QuestionUpdateDto dto) throws QuestionNotFoundException, CompanyNotFoundException {
        var question = quesRep
                .findById(dto.getId())
                .orElseThrow(QuestionNotFoundException::new);

        var category = findOrCreateCategory(dto.getCategoryTitle());

        question.setCategory(category);
        question.setText(dto.getName());
        question.setType(dto.getType());
        question.setPayload(dto.getDetails());
        question.setRequired(dto.isRequired());

        return quesRep.save(question);
    }

    public void saveOrdered(QuestionnaireOrderedDto dto)
            throws QuestionNotFoundException, QuestionnaireNotFoundException, CompanyNotFoundException, SectionNotFoundException {
        Map<Question, Integer> questionsIndices = new HashMap<>();
        for (QuestionUpsertDto question: dto.getQuestions() ) {
            questionsIndices.put(this.getOrCreate(question), question.getIndex());
        }

        var questionnaire = anketRep.findById(dto.getId())
                .orElseThrow(QuestionnaireNotFoundException::new);
        var bindRows = questionsIndices.entrySet().stream()
                .map(entry -> QuestionnaireQuestion.getFromEntities(entry.getKey(), questionnaire, entry.getValue()))
                .collect(Collectors.toList());
        questionnaire.setQuestions(bindRows);

        anketRep.save(questionnaire);
    }


    public void delete(UUID id) {
        quesRep.deleteById(id);
    }

    private QuestionCategory findOrCreateCategory(String name) throws CompanyNotFoundException {
        var company = companyRep.findById(TokenService.getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);

        return quesCategRep.findByTitle(name)
                .orElseGet(() -> quesCategRep.save(QuestionCategory.builder()
                        .title(name)
                        .company(company)
                        .build()));
    }

    public Question getOrCreate(QuestionUpsertDto question)
            throws QuestionNotFoundException, CompanyNotFoundException, QuestionnaireNotFoundException, SectionNotFoundException {
        return question.getId() == null
                ? this.createModel(QuestionMapper.MAPPER.upsertDtoToCreateDto(question))
                : this.updateModel(QuestionMapper.MAPPER.upsertDtoToUpdateDto(question));
    }


    public void index(QuestionIndexDto dto) throws QuestionNotFoundException {
        List<QuestionnaireQuestion> binds = new ArrayList<>();
        for (IndexDto question : dto.getQuestions()) {
            var bindRow = this.qqRepo.findByQuestionIdAndQuestionnaireId(
                    question.getQuestionId(),
                    dto.getQuestionnaireId()
            ).orElseThrow(QuestionNotFoundException::new);
            bindRow.setIndex(question.getIndex());
            binds.add(bindRow);
        }
        qqRepo.saveAll(binds);
    }

    public void deleteOneByQuestionnaireIdAndQuestionId(UUID questionId, UUID qId) {
        qqRepo.deleteByQuestionIdAndQuestionnaireId(questionId, qId);
        var section = sectionRepository.findByQuestionnaireIdAndQuestionId(qId, questionId);
        sectionRepository.deleteQuestion(section.getId(), questionId);
    }

    public List<QuestionDto> getAllBySection(UUID id) {
        return quesRep.findAllBySectionId(id)
                .stream()
                .map(QuestionMapper.MAPPER::questionToQuestionDto)
                .collect(Collectors.toList());
    }
}
