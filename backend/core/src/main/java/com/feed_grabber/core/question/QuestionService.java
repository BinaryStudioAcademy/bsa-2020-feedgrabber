package com.feed_grabber.core.question;

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

    private final QuestionRepository questionRepository;
    private final QuestionnaireRepository questionnaireRepository;
    private final QuestionCategoryRepository questionCategoryRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository,
                           QuestionnaireRepository questionnaireRepository,
                           QuestionCategoryRepository questionCategoryRepository) {
        this.questionRepository = questionRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.questionCategoryRepository = questionCategoryRepository;
    }

    public List<QuestionDto> getAll() {
        return questionRepository.findAll()
                .stream()
                .map(QuestionMapper.MAPPER::questionToQuestionDto)
                .collect(Collectors.toList());
    }

    public List<QuestionDto> getAllByQuestionnaireId(UUID questionnaireId) {
        return questionRepository.findAllByQuestionnaireId(questionnaireId)
                .stream()
                .map(QuestionMapper.MAPPER::questionToQuestionDto)
                .collect(Collectors.toList());
    }

    public Optional<QuestionDto> getOne(UUID id) {
        return questionRepository
                .findById(id)
                .map(QuestionMapper.MAPPER::questionToQuestionDto);
    }

    public QuestionDto create(QuestionCreateDto dto) throws QuestionnaireNotFoundException {
        // TODO replace with jwt info
        var companyId = UUID.randomUUID();

        var questionnaire = questionnaireRepository.findById(dto.getQuestionnaireId())
                .orElseThrow(QuestionnaireNotFoundException::new);

        var category = findOrCreateCategory(dto.getCategoryName(), companyId);

        var q = Question.builder()
                .category(category)
                .payload(dto.getPayload())
                .questionnaires(List.of(questionnaire))
                .text(dto.getText())
                .type(dto.getType())
                .companyId(companyId)
                .build();

        return QuestionMapper.MAPPER.questionToQuestionDto(questionRepository.save(q));
    }

    public QuestionDto update(QuestionUpdateDto dto) throws QuestionNotFoundException {
        // TODO replace with jwt info
        var companyId = UUID.randomUUID();

        var question = questionRepository.findById(dto.getId())
                .orElseThrow(QuestionNotFoundException::new);

        var category = findOrCreateCategory(dto.getCategoryName(), companyId);

        question.setCategory(category);
        question.setText(dto.getText());

        return QuestionMapper.MAPPER.questionToQuestionDto(questionRepository.save(question));
    }

    public void delete(UUID id) {
        questionRepository.deleteById(id);
    }

    private QuestionCategory findOrCreateCategory(String name, UUID companyId) {
        return questionCategoryRepository.findByTitle(name)
                .orElseGet(() -> questionCategoryRepository.save(QuestionCategory.builder()
                        .title(name)
                        .companyId(companyId)
                        .build()));
    }
}
