package com.feed_grabber.core.request;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.rabbit.Sender;
import com.feed_grabber.core.rabbit.entityExample.MailType;
import com.feed_grabber.core.registration.TokenType;
import com.feed_grabber.core.request.dto.RequestCreationRequestDto;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.team.TeamRepository;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import com.feed_grabber.core.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RequestService {

    RequestRepository requestRepository;
    QuestionnaireRepository questionnaireRepository;
    UserRepository userRepository;
    TeamRepository teamRepository;
    ThreadPoolTaskScheduler threadPoolTaskScheduler;
    Sender emailSender;

    public RequestService(RequestRepository requestRepository,
                          QuestionnaireRepository questionnaireRepository,
                          UserRepository userRepository,
                          TeamRepository teamRepository,
                          ThreadPoolTaskScheduler threadPoolTaskScheduler,
                          Sender emailSender) {
        this.requestRepository = requestRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.threadPoolTaskScheduler = threadPoolTaskScheduler;
        this.emailSender = emailSender;
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

        var id = requestRepository.save(request).getId();

        threadPoolTaskScheduler.schedule(() -> {
            requestRepository.findById(id).map(Request::getRespondents).orElse(List.of()).forEach(user -> {
                emailSender.sendToProcessor(
                        "Hi, it`s almost deadline!",
                        user.getEmail(),
                        MailType.REGISTER.toString());// to be NOTIFY
            });
        }, new Date());

        return id;
    }
}
