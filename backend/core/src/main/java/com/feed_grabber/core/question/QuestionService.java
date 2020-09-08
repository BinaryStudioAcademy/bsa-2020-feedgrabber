package com.feed_grabber.core.question;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.question.dto.*;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.QuestionCategoryRepository;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.sections.SectionRepository;
import lombok.SneakyThrows;
import org.hibernate.HibernateException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.feed_grabber.core.auth.security.TokenService.getCompanyId;

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

    public List<QuestionDto> getAll(UUID companyId, Integer page, Integer size) {
        return quesRep.findAllByCompanyId(companyId, PageRequest.of(page, size))
                .stream()
                .map(QuestionMapper.MAPPER::questionToQuestionDto)
                .collect(Collectors.toList());
    }

    public Long countByCompanyId(UUID companyId) {
        return quesRep.countAllByCompanyId(companyId);
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


    public QuestionDto create(QuestionCreateDto dto) throws NotFoundException {
        var question = this.createModel(dto);
        return QuestionMapper.MAPPER.questionToQuestionDto(question);
    }

    @Transactional
    public Question createModel(QuestionCreateDto dto) throws NotFoundException {
        var question = Question.builder();

        var company = companyRep
                .findById(getCompanyId())
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
        if (dto.getSectionId().isPresent()) {
            this.sectionRepository.addQuestion(dto.getSectionId().get(), savedQuestion.getId(), dto.getIndex());
        }
        return savedQuestion;
    }

    @Transactional
    public void addExistingQuestions(AddExistingQuestionsDto dto) throws QuestionnaireNotFoundException {
        var questionnaire = anketRep
                .findById(dto.getQuestionnaireId())
                .orElseThrow(QuestionnaireNotFoundException::new);

        dto.getQuestions()
                .forEach(q -> this.sectionRepository.addQuestion(dto.getSectionId(), q.getQuestionId(), q.getIndex()));

        anketRep.save(questionnaire);
    }

    public void addExistingQuestionBySection(AddExistingQuestionBySectionDto dto) throws NotFoundException {

        var indexedQuestion = dto.getQuestionIndexed();

        var question = quesRep
                .findById(indexedQuestion.getQuestionId())
                .orElseThrow(NotFoundException::new);

        sectionRepository.addQuestion(dto.getSectionId(), question.getId(), indexedQuestion.getIndex());
    }

    public QuestionDto update(QuestionUpdateDto dto)
            throws QuestionNotFoundException, CompanyNotFoundException {
        if (dto.getDetails().equals("")) dto.setDetails("{}");
        var question = this.updateModel(dto);
        return QuestionMapper.MAPPER.questionToQuestionDto(question);
    }

    private Question updateModel(QuestionUpdateDto dto) throws QuestionNotFoundException, CompanyNotFoundException {
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

    public void delete(UUID id) {
        quesRep.deleteById(id);
    }

    private QuestionCategory findOrCreateCategory(String name) throws CompanyNotFoundException {
        var company = companyRep.findById(getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);

        return quesCategRep.findByTitle(name)
                .orElseGet(() -> quesCategRep.save(QuestionCategory.builder()
                        .title(name)
                        .company(company)
                        .build()));
    }

    @SneakyThrows
    public Question getOrCreate(QuestionUpsertDto question) {
        return question.getId() == null
                ? this.createModel(QuestionMapper.MAPPER.upsertDtoToCreateDto(question))
                : this.updateModel(QuestionMapper.MAPPER.upsertDtoToUpdateDto(question));
    }

    public void index(QuestionIndexDto dto) throws NotFoundException {
        try {
            dto.getQuestions().forEach(q -> sectionRepository.setIndex(dto.getSectionId(), q.getQuestionId(), q.getIndex()));
        } catch (HibernateException e) {
            throw new NotFoundException("Section or question not found");
        }
    }

    public void deleteOneByQuestionnaireIdAndQuestionId(UUID questionId, UUID qId) {
        var section = sectionRepository.findByQuestionnaireIdAndQuestionId(qId, questionId);
        sectionRepository.deleteQuestion(section.getId(), questionId);

        anketRep.deleteQuestionFromQuestionnaire(qId, questionId);
    }

    public List<QuestionDto> getAllBySection(UUID id) {
        return quesRep.findAllBySectionId(id)
                .stream()
                .map(QuestionMapper.MAPPER::questionToQuestionDto)
                .collect(Collectors.toList());
    }
}
