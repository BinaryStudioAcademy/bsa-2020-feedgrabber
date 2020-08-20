package com.feed_grabber.core.request;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.config.NotificationService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.notification.UserNotificationMapper;
import com.feed_grabber.core.notification.dto.NotificationResponseDto;
import com.feed_grabber.core.notification.model.UserNotification;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.request.dto.RequestCreationRequestDto;
import com.feed_grabber.core.team.TeamRepository;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import com.feed_grabber.core.user.model.User;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RequestService {

    RequestRepository requestRepository;
    QuestionnaireRepository questionnaireRepository;
    UserRepository userRepository;
    TeamRepository teamRepository;
    NotificationService notificationService;

    public RequestService(RequestRepository requestRepository,
                          QuestionnaireRepository questionnaireRepository,
                          UserRepository userRepository,
                          TeamRepository teamRepository,
                          NotificationService notificationService) {
        this.requestRepository = requestRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.notificationService = notificationService;
    }

    @Transactional(rollbackFor = NotFoundException.class)
    public UUID createNew(RequestCreationRequestDto dto) throws NotFoundException {
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

        List<User> respondentsFromUser = userRepository
                .findAllById(dto.getRespondentIds());
        List<User> respondentsFromTeams = teamRepository
                .findAllById(dto.getTeamIds())
                .stream()
                .flatMap(team -> team.getUsers().stream()).collect(Collectors.toList());

        List<User> respondents = new ArrayList<>();
        respondents.addAll(respondentsFromUser);
        respondents.addAll(respondentsFromTeams);
        respondents = respondents.stream().distinct().collect(Collectors.toList());

        if (!dto.getIncludeTargetUser()) {
            respondents.removeIf(user -> user.getId().equals(dto.getTargetUserId()));
        }
        request.setRespondents(respondents);

        if(dto.getNotifyUsers()) {
            UserNotification userNotification = new UserNotification();
            userNotification.setText("You have new request!");
            userNotification.setRequest(request);
            request.setUserNotification(userNotification);
        }

        UUID savedUUID = requestRepository.save(request).getId();

        var savedRequest = requestRepository.findById(savedUUID).orElseThrow(NotFoundException::new);

        if(dto.getNotifyUsers()) {
            notificationService.sendMessageToUsers(
                    respondents.stream().map(user -> user.getId().toString()).collect(Collectors.toList()),
                    "alert",
                    UserNotificationMapper.MAPPER.notificationResponseDtoFromModel(savedRequest.getUserNotification()));

        }
        return savedUUID;
    }
}
