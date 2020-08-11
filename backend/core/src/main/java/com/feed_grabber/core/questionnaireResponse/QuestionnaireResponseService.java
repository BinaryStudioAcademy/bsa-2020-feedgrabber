package com.feed_grabber.core.questionnaireResponse;

import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.questionnaireResponse.dto.QuestionnaireResponseCreateDto;
import com.feed_grabber.core.questionnaireResponse.dto.QuestionnaireResponseDto;
import com.feed_grabber.core.questionnaireResponse.model.QuestionnaireResponse;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class QuestionnaireResponseService {
    @Autowired
    private QuestionnaireResponseRepository responseRepository;

    @Autowired
    private UserRepository userRepository;

    public List<QuestionnaireResponseDto> getAll() {
        return responseRepository.findAll().stream()
                .map(QuestionnaireResponseMapper.MAPPER::questionnaireResponseToQuestionnaireResponseDto)
                .collect(Collectors.toList());
    }

    public List<QuestionnaireResponseDto> getByRespondentId(UUID respondentId) {
        return responseRepository.findAllByRespondentId(respondentId).stream()
                .map(QuestionnaireResponseMapper.MAPPER::questionnaireResponseToQuestionnaireResponseDto)
                .collect(Collectors.toList());
    }

    public Optional<QuestionnaireResponseDto> getOne(UUID id) {
        return responseRepository.findById(id)
                .map(QuestionnaireResponseMapper.MAPPER::questionnaireResponseToQuestionnaireResponseDto);
    }

    public void delete(UUID id) {
        responseRepository.deleteById(id);
    }

    public QuestionnaireResponseDto create(QuestionnaireResponseCreateDto createDto, UUID respondentId)
            throws UserNotFoundException, AlreadyExistsException {

        if (responseRepository.findByRequestAndRespondentId(createDto.getRequestId(), respondentId).isPresent()) {
            throw new AlreadyExistsException("Unable to save questionnaire response: response already exist");
        }

        User respondent = userRepository.findById(respondentId)
                .orElseThrow(UserNotFoundException::new);

        QuestionnaireResponse questionnaireResponse = QuestionnaireResponseMapper.MAPPER
                .questionnaireResponseCreateDtoToModel(createDto, respondent);

        return QuestionnaireResponseMapper.MAPPER
                .questionnaireResponseToQuestionnaireResponseDto(responseRepository.save(questionnaireResponse));
    }

}
