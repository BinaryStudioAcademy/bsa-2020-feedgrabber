package com.feed_grabber.core.responseAnswer;

import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.question.QuestionRepository;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionnaireResponse.QuestionnaireResponseRepository;
import com.feed_grabber.core.questionnaireResponse.exceptions.QuestionnaireResponseNotFoundException;
import com.feed_grabber.core.questionnaireResponse.model.QuestionnaireResponse;
import com.feed_grabber.core.responseAnswer.dto.ResponseAnswerCreateDto;
import com.feed_grabber.core.responseAnswer.dto.ResponseAnswerDto;
import com.feed_grabber.core.responseAnswer.model.ResponseAnswer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ResponseAnswerService {

    private ResponseAnswerRepository answerRepository;
    private QuestionRepository questionRepository;
    private QuestionnaireResponseRepository responseRepository;

    @Autowired
    public ResponseAnswerService(ResponseAnswerRepository answerRepository,
                                 QuestionRepository questionRepository,
                                 QuestionnaireResponseRepository responseRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.responseRepository = responseRepository;
    }

    public List<ResponseAnswerDto> getAll() {
        return answerRepository.findAll().stream()
                .map(ResponseAnswerMapper.MAPPER::responseAnswerToResponseAnswerDto)
                .collect(Collectors.toList());
    }

    public Optional<ResponseAnswerDto> getOne(UUID id) {
        return answerRepository.findById(id)
                .map(ResponseAnswerMapper.MAPPER::responseAnswerToResponseAnswerDto);
    }

    public ResponseAnswerDto create(ResponseAnswerCreateDto createDto)
            throws AlreadyExistsException, QuestionnaireResponseNotFoundException, QuestionNotFoundException {
        if (answerRepository.findByResponseIdAndQuestionId(createDto.getResponseId(), createDto.getQuestionId()).isPresent()) {
            throw new AlreadyExistsException("Unable to save question answer: answer already exist");
        }

        QuestionnaireResponse questionnaireResponse = responseRepository.findById(createDto.getResponseId())
                .orElseThrow(QuestionnaireResponseNotFoundException::new);
        Question question = questionRepository.findById(createDto.getQuestionId())
                .orElseThrow(QuestionNotFoundException::new);

        ResponseAnswer responseAnswer = new ResponseAnswer(null, createDto.getText(), questionnaireResponse, question);
        return ResponseAnswerMapper.MAPPER.responseAnswerToResponseAnswerDto(answerRepository.save(responseAnswer));
    }

    public void delete(UUID id) {
        answerRepository.deleteById(id);
    }

}
