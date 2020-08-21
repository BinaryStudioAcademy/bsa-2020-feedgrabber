package com.feed_grabber.core.request;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.config.NotificationService;
import com.feed_grabber.core.notification.UserNotificationMapper;
import com.feed_grabber.core.notification.UserNotificationRepository;
import com.feed_grabber.core.notification.model.UserNotification;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.request.dto.CreateRequestDto;
import com.feed_grabber.core.response.ResponseRepository;
import com.feed_grabber.core.response.model.Response;
import com.feed_grabber.core.team.TeamRepository;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import com.feed_grabber.core.user.model.User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final QuestionnaireRepository questionnaireRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final ResponseRepository responseRepository;
    private final UserNotificationRepository userNotificationRepository;
    private final NotificationService notificationService;

    public RequestService(RequestRepository requestRepository,
                          QuestionnaireRepository questionnaireRepository,
                          UserRepository userRepository,
                          TeamRepository teamRepository,
                          ResponseRepository responseRepository,
                          UserNotificationRepository userNotificationRepository,
                          NotificationService notificationService) {
        this.requestRepository = requestRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.responseRepository = responseRepository;
        this.userNotificationRepository = userNotificationRepository;
        this.notificationService = notificationService;
    }

    public UUID createNew(CreateRequestDto dto) throws QuestionCategoryNotFoundException, UserNotFoundException {
        var questionnaire = questionnaireRepository
                .findById(dto.getQuestionnaireId())
                .orElseThrow(QuestionCategoryNotFoundException::new);

        var currentUser = userRepository
                .findById(TokenService.getUserId())
                .orElseThrow(UserNotFoundException::new);

        var targetUser = dto.getTargetUserId() == null ? null :
                userRepository
                        .findById(dto.getTargetUserId())
                        .orElseThrow(() -> new UserNotFoundException("Target User not Found"));

        var date = dto.getExpirationDate();

        var toSave = RequestMapper.MAPPER
                .requestCreationRequestDtoToModel(dto, questionnaire, targetUser, currentUser, date);

        var request = requestRepository.save(toSave);

        var users = new HashSet<>(userRepository.findAllById(dto.getRespondentIds()));

        users.addAll(teamRepository
                .findAllById(dto.getTeamIds())
                .stream()
                .flatMap(team -> team.getUsers().stream())
                .collect(Collectors.toSet()));

        if (targetUser != null) {
            if (dto.getIncludeTargetUser()) users.add(targetUser);
            else users.remove(targetUser);
        }

        var notificationExists = dto.getNotifyUsers();
        var responses = users.stream()
                .map(u -> Response.builder().user(u).request(request).notificationExists(notificationExists).build())
                .collect(Collectors.toList());

        responseRepository.saveAll(responses);

        if (dto.getNotifyUsers()) {
            var toSaveNotification = UserNotification
                    .builder()
                    .request(request)
                    .text("You have new questionnaire request")
                    .build();

            var notification = userNotificationRepository.save(toSaveNotification);

            var userIds = users.stream().map(user -> user.getId().toString()).collect(Collectors.toList());
            notificationService.sendMessageToUsers(
                    userIds,
                    "notify",
                    "You have a new notification");
        }

        return request.getId();
    }
}
