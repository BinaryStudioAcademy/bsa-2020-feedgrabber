package com.feed_grabber.core.question;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.question.dto.AddExistingQuestionDto;
import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.QuestionCategoryRepository;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository quesRep;
    private final QuestionnaireRepository anketRep;
    private final QuestionCategoryRepository quesCategRep;
    private final CompanyRepository companyRep;

    @Autowired
    public QuestionService(QuestionRepository quesRep,
                           QuestionnaireRepository anketRep,
                           QuestionCategoryRepository quesCategRep, CompanyRepository companyRep) {
        this.quesRep = quesRep;
        this.anketRep = anketRep;
        this.quesCategRep = quesCategRep;
        this.companyRep = companyRep;
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
            throws QuestionnaireNotFoundException, CompanyNotFoundException {

        var question = Question.builder();

        var company = companyRep
                .findById(TokenService.getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);

        if (dto.getQuestionnaireId().isPresent()) {
            question.questionnaires(
                    List.of(anketRep
                            .findById(dto.getQuestionnaireId().get())
                            .orElseThrow(QuestionnaireNotFoundException::new))
            );
        }

        var category = findOrCreateCategory(dto.getCategoryTitle());

        question
                .category(category)
                .payload(dto.getDetails())
                .text(dto.getName())
                .type(dto.getType())
                .company(company);

        return QuestionMapper.MAPPER.questionToQuestionDto(quesRep.save(question.build()));
    }

    public QuestionDto addExistingQuestion(AddExistingQuestionDto dto)
            throws QuestionNotFoundException, QuestionnaireNotFoundException {

        var question = quesRep
                .findById(dto.getQuestionId())
                .orElseThrow(QuestionNotFoundException::new);

        var questionnaire = anketRep
                .findById(dto.getQuestionnaireId())
                .orElseThrow(QuestionnaireNotFoundException::new);

        if (question.getQuestionnaires() == null) {
            question.setQuestionnaires(List.of(questionnaire));
        } else {
            question.getQuestionnaires().add(questionnaire);
        }

        return QuestionMapper.MAPPER.questionToQuestionDto(quesRep.save(question));
    }

    public QuestionDto update(QuestionUpdateDto dto)
            throws QuestionNotFoundException, CompanyNotFoundException {

        var question = quesRep
                .findById(dto.getId())
                .orElseThrow(QuestionNotFoundException::new);

        var category = findOrCreateCategory(dto.getCategoryTitle());

        question.setCategory(category);
        question.setText(dto.getName());
        question.setPayload(dto.getDetails());

        return QuestionMapper.MAPPER.questionToQuestionDto(quesRep.save(question));
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
}
