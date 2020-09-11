package com.feed_grabber.core.question;

import com.feed_grabber.core.apiContract.DataList;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;
import com.feed_grabber.core.question.dto.*;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.QuestionCategoryRepository;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.search.SearchRepository;
import com.feed_grabber.core.search.dto.PagedResponseDto;
import com.feed_grabber.core.sections.SectionRepository;
import com.feed_grabber.core.sections.exception.SectionNotFoundException;
import lombok.SneakyThrows;
import org.hibernate.HibernateException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import static com.feed_grabber.core.auth.security.TokenService.getCompanyId;

@Service
public class QuestionService {

    private final QuestionRepository quesRep;
    private final QuestionnaireRepository anketRep;
    private final QuestionCategoryRepository quesCategRep;
    private final CompanyRepository companyRep;
    private final SectionRepository sectionRepository;
    private final SearchRepository searchRepository;

    public QuestionService(QuestionRepository quesRep,
                           QuestionnaireRepository anketRep,
                           QuestionCategoryRepository quesCategRep,
                           CompanyRepository companyRep,
                           SectionRepository sectionRepository, SearchRepository searchRepository) {
        this.quesRep = quesRep;
        this.anketRep = anketRep;
        this.quesCategRep = quesCategRep;
        this.companyRep = companyRep;
        this.sectionRepository = sectionRepository;
        this.searchRepository = searchRepository;
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

    public DataList<QuestionDto> getAllExceptOneQuestionnaire(UUID questionnaireId, Integer page, Integer size) {
        var res = quesRep.findAllByCompanyIdAndQuestionnaireIdNot(
                TokenService.getCompanyId(),
                questionnaireId,
                PageRequest.of(page, size)
        );

        return new DataList<>(
                res.get().map(QuestionMapper.MAPPER::questionToQuestionDto).collect(Collectors.toList()),
                res.getTotalElements(),
                page,
                size
        );
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
    public void addExistingQuestions(AddExistingQuestionsDto dto) throws SectionNotFoundException {
        var section = this.sectionRepository.findById(dto.getSectionId())
                .orElseThrow(SectionNotFoundException::new);

        var size = new AtomicInteger(section.getQuestions().size());

        dto.getQuestions()
                .forEach(q -> this.sectionRepository.addQuestion(section.getId(), q, size.getAndIncrement()));
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
            throw new NotFoundException(Translator.toLocale("section_or_question_not_found"));
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

    public PagedResponseDto<QuestionDto> searchAll(Optional<String> query, Integer page, Integer size, Optional<UUID> questionnaire) {
        return searchRepository.getQuestionsList(query.orElse(""), Optional.ofNullable(page), Optional.ofNullable(size), questionnaire);
    }
}
