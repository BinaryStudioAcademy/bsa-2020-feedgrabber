package com.feed_grabber.core.request;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.request.dto.RequestCreationRequestDto;
import com.feed_grabber.core.team.TeamRepository;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import com.feed_grabber.core.user.model.User;
import org.springframework.stereotype.Service;

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

    public RequestService(RequestRepository requestRepository,
                          QuestionnaireRepository questionnaireRepository,
                          UserRepository userRepository,
                          TeamRepository teamRepository) {
        this.requestRepository = requestRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
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

        respondents.removeIf(user -> user.getId().equals(dto.getTargetUserId()));
        if (dto.getIncludeTargetUser()) {
            respondents.add(request.getTargetUser());
        }

        request.setRespondents(respondents);

        return requestRepository.save(request).getId();
    }
}
