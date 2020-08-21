package com.feed_grabber.core.request;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.rabbit.Sender;
import com.feed_grabber.core.request.dto.CreateRequestDto;
import com.feed_grabber.core.response.ResponseRepository;
import com.feed_grabber.core.response.model.Response;
import com.feed_grabber.core.team.TeamRepository;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class RequestService {

    RequestRepository requestRepository;
    QuestionnaireRepository questionnaireRepository;
    UserRepository userRepository;
    TeamRepository teamRepository;
    ResponseRepository responseRepository;

    public RequestService(RequestRepository requestRepository,
                          QuestionnaireRepository questionnaireRepository,
                          UserRepository userRepository,
                          TeamRepository teamRepository,
                          ResponseRepository responseRepository) {
        this.requestRepository = requestRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.responseRepository = responseRepository;
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

        var date = LocalDateTime.now().plusSeconds(TimeUnit.SECONDS.
                convert(dto.getSecondsToDeadline(),
                        TimeUnit.NANOSECONDS)
        );

        var toSave = RequestMapper.MAPPER
                .requestCreationRequestDtoToModel(dto, questionnaire, targetUser, currentUser, date);

        var request = requestRepository.save(toSave);

        var users = userRepository
                .findAllById(dto.getRespondentIds());

        var usersFromTeams = teamRepository
                .findAllById(dto.getTeamIds())
                .stream()
                .flatMap(team -> team.getUsers().stream()).collect(Collectors.toList());

        var responses = Stream
                .concat(users.stream(), usersFromTeams.stream())
                .distinct()
                .map(u -> Response.builder().user(u).request(request).build())
                .collect(Collectors.toList());

        if (!responses.isEmpty()) responseRepository.saveAll(responses);

        return request.getId();
    }
}
