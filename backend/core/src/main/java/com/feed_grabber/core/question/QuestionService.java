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
    private final SectionRepository sectionRepository;

    public QuestionService(QuestionRepository quesRep,
                           QuestionnaireRepository anketRep,
                           QuestionCategoryRepository quesCategRep,
                           CompanyRepository companyRep,
                           SectionRepository sectionRepository) {
        this.quesRep = quesRep;
        this.anketRep = anketRep;
        this.quesCategRep = quesCategRep;
        this.companyRep = companyRep;
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


    public QuestionDto create(QuestionCreateDto dto)
            throws CompanyNotFoundException, QuestionnaireNotFoundException, SectionNotFoundException {
        var question = this.createModel(dto);
        return QuestionMapper.MAPPER.questionToQuestionDto(question);
    }

    @Transactional
    public Question createModel(QuestionCreateDto dto)
            throws CompanyNotFoundException, QuestionnaireNotFoundException, SectionNotFoundException {
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

            Section section;
            if (dto.getSectionId().isEmpty()) {
                section = this.sectionRepository.findByQuestionnaireIdAndTitle(questionnaire.getId(), questionnaire.getTitle());
            } else {
                section = this.sectionRepository.findById(dto.getSectionId().get())
                        .orElseThrow(SectionNotFoundException::new);
            }
            this.sectionRepository.addQuestion(section.getId(), savedQuestion.getId(), dto.getIndex());
        }
        return savedQuestion;
    }

    @Transactional
    public List<QuestionDto> addExistingQuestion(AddExistingQuestionsDto dto) throws QuestionnaireNotFoundException {

        var questionnaire = anketRep
                .findById(dto.getQuestionnaireId())
                .orElseThrow(QuestionnaireNotFoundException::new);

        var bindRows = dto.getQuestions().stream()
                .map(q -> QuestionnaireQuestion.getFromEntities(
                        this.quesRep.findById(q.getId()).orElseThrow(),
                        questionnaire,
                        q.getIndex()))
                .collect(Collectors.toList());

        questionnaire.getQuestions().addAll(dto.getQuestions());

        dto.getQuestions()
                .forEach(q -> this.sectionRepository.addQuestion(dto.getSectionId(), q.getId(), q.getIndex()));

        anketRep.save(questionnaire);

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


    public void index(QuestionIndexDto dto) throws QuestionNotFoundException, SectionNotFoundException {
        for (IndexDto question : dto.getQuestions()) {
            quesRep.findById(question.getQuestionId()).orElseThrow(QuestionNotFoundException::new);
            sectionRepository.findById(dto.getSectionId()).orElseThrow(SectionNotFoundException::new);
            sectionRepository.setIndex(dto.getSectionId(), question.getQuestionId(), question.getIndex());
        }
    }

    public void deleteOneByQuestionnaireIdAndQuestionId(UUID questionId, UUID qId) {
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
