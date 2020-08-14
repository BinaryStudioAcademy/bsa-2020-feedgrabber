package com.feed_grabber.core.question;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.company.CompanyRepository;
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

    public QuestionDto create(QuestionCreateDto dto, UUID companyId) throws QuestionnaireNotFoundException {
        var company = companyRep.findById(companyId).get();

        // var questionnaire = anketRep.findById(dto.getQuestionnaireId())
        //         .orElseThrow(QuestionnaireNotFoundException::new);

        var category = findOrCreateCategory(dto.getCategoryTitle(), company);

        var q = Question.builder()
                .category(category)
                .payload(dto.getDetails())
                .text(dto.getName())
                .type(dto.getType())
                .company(company)
                .build();

        return QuestionMapper.MAPPER.questionToQuestionDto(quesRep.save(q));
    }

    public QuestionDto update(QuestionUpdateDto dto, UUID companyId) throws QuestionNotFoundException {
        var company = companyRep.findById(companyId).get();

        var question = quesRep.findById(dto.getId())
                .orElseThrow(QuestionNotFoundException::new);

        var category = findOrCreateCategory(dto.getCategoryTitle(), company);

        question.setCategory(category);
        question.setText(dto.getName());
        question.setPayload(dto.getDetails());

        return QuestionMapper.MAPPER.questionToQuestionDto(quesRep.save(question));
        // question.setText(updateDto.getText());
        // question = questionRepository.save(question);

        // if (!question.getQuestionnaires().contains(questionnaire)) {
        //     question.getQuestionnaires().add(questionnaire);
        // }

        // return QuestionMapper.MAPPER.questionToQuestionDto(question, questionnaire);
    }

    public void delete(UUID id) {
        quesRep.deleteById(id);
    }

    private QuestionCategory findOrCreateCategory(String name, Company company) {
        return quesCategRep.findByTitle(name)
                .orElseGet(() -> quesCategRep.save(QuestionCategory.builder()
                        .title(name)
                        .company(company)
                        .build()));
    }
}
