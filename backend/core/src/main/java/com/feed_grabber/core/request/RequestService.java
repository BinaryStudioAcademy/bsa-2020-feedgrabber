package com.feed_grabber.core.request;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.request.dto.RequestCreationRequestDto;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RequestService {

    RequestRepository requestRepository;
    QuestionnaireRepository questionnaireRepository;
    UserRepository userRepository;

    public RequestService(RequestRepository requestRepository,
                          QuestionnaireRepository questionnaireRepository,
                          UserRepository userRepository) {
        this.requestRepository = requestRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.userRepository = userRepository;
    }

    public UUID createNew(RequestCreationRequestDto dto) throws QuestionCategoryNotFoundException,
            UserNotFoundException {
        var request = RequestMapper.MAPPER.requestCreationRequestDtoToModel(dto);
        request.setQuestionnaire(
                questionnaireRepository.
                        findById(dto.getQuestionnaireId()).
                        orElseThrow(QuestionCategoryNotFoundException::new));

        request.setTargetUser(
                userRepository.
                        findById(dto.getTargetUserId()).
                        orElseThrow(() -> new UserNotFoundException("Target User Not Found")));

        request.setRequestMaker(
                userRepository.
                        findById(TokenService.getUserId()).
                        orElseThrow(UserNotFoundException::new));

        request.setRespondents(userRepository.findAllById(dto.getRespondentIds()));

        return requestRepository.save(request).getId();
    }
}
