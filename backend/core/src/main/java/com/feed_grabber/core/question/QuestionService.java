package com.feed_grabber.core.question;

import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.exceptions.QuestionExistsException;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.QuestionCategoryRepository;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
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
        return questionRepository.findById(id)
                .map(QuestionMapper.MAPPER::questionToQuestionDto);
    }

    public QuestionDto create(QuestionCreateDto dto)
            throws QuestionnaireNotFoundException, QuestionCategoryNotFoundException, QuestionExistsException {
        // TODO replace with jwt info
        var companyId = UUID.randomUUID();

        var questionnaire = questionnaireRepository.findById(dto.getQuestionnaireId())
                .orElseThrow(QuestionnaireNotFoundException::new);

        var category = questionCategoryRepository.findByName(dto.getCategoryName())
                .orElseGet(() -> questionCategoryRepository.save(QuestionCategory.builder()
                            .title(dto.getCategoryName())
                            .companyId(companyId)
                            .build()));

        var q = Question.builder()
                .category(category)
                .payload(dto.getPayload())
                .questionnaires(List.of(questionnaire))

        return QuestionMapper.MAPPER.questionToQuestionDto(questionRepository.save(question));
    }

    public QuestionDto update(QuestionUpdateDto updateDto)
            throws QuestionNotFoundException, QuestionnaireNotFoundException, QuestionCategoryNotFoundException, QuestionExistsException {

        var question = questionRepository.findById(updateDto.getId())
                .orElseThrow(QuestionNotFoundException::new);

        var questionnaire = questionnaireRepository.findById(updateDto.getQuestionnaireId())
                .orElseThrow(QuestionnaireNotFoundException::new);
        var category = questionCategoryRepository.findById(updateDto.getCategoryId())
                .orElseThrow(QuestionCategoryNotFoundException::new);
        if (questionRepository.existsByTextAndQuestionnaireIdAndCategoryIdAndIdIsNot
                (updateDto.getText(), updateDto.getQuestionnaireId(), updateDto.getCategoryId(), updateDto.getId())) {
            throw new QuestionExistsException();
        }

        question.setCategory(category);
        question.setQuestionnaire(questionnaire);
        question.setText(updateDto.getText());
        question = questionRepository.save(question);
        return QuestionMapper.MAPPER.questionToQuestionDto(question);
    }

    public void delete(UUID id) {
        questionRepository.delete(question);
    }
}
