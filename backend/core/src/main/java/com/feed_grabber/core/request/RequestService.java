package com.feed_grabber.core.request;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.file.FileRepository;
import com.feed_grabber.core.file.dto.S3FileCreationDto;
import com.feed_grabber.core.file.model.S3File;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.request.dto.CreateRequestDto;
import com.feed_grabber.core.request.dto.PendingRequestDto;
import com.feed_grabber.core.request.dto.RequestQuestionnaireDto;
import com.feed_grabber.core.request.dto.RequestShortDto;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.response.ResponseRepository;
import com.feed_grabber.core.response.model.Response;
import com.feed_grabber.core.team.TeamRepository;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RequestService {
    RequestRepository requestRepository;
    QuestionnaireRepository questionnaireRepository;
    UserRepository userRepository;
    TeamRepository teamRepository;
    ResponseRepository responseRepository;
    FileRepository fileRepository;

    public RequestService(RequestRepository requestRepository,
                          QuestionnaireRepository questionnaireRepository,
                          UserRepository userRepository,
                          TeamRepository teamRepository,
                          ResponseRepository responseRepository,
                          FileRepository fileRepository) {
        this.requestRepository = requestRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.responseRepository = responseRepository;
        this.fileRepository = fileRepository;
    }

    public UUID createNew(CreateRequestDto dto) throws QuestionCategoryNotFoundException, UserNotFoundException {
        var questionnaire = questionnaireRepository
                .findById(dto.getQuestionnaireId())
                .orElseThrow(QuestionCategoryNotFoundException::new);
        if (questionnaire.isEditingEnabled()) {
            questionnaire.setEditingEnabled(false);
            questionnaireRepository.save(questionnaire);
        }
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

        var responses = users.stream()
                .map(u -> Response.builder().user(u).request(request).build())
                .collect(Collectors.toList());

        responseRepository.saveAll(responses);

        return request.getId();
    }

    public List<PendingRequestDto> getPending(UUID userId) {
        return requestRepository
                .findAllByResponsesUserId(userId)
                .stream()
                .map(r -> RequestMapper.MAPPER.toPendingDtoFromModel(r, userId))
                .sorted(
                        Comparator.comparing(PendingRequestDto::getExpirationDate
                                , Comparator.nullsFirst(Comparator.naturalOrder())).reversed()
                )
                .collect(Collectors.toList());
    }

    public List<RequestQuestionnaireDto> getAllByUserId(UUID id) {
        return requestRepository.findAllUnansweredByRespondentId(id)
                .stream()
                .map(request -> RequestMapper.MAPPER.
                        requestAndQuestionnaireToDto(request, request.getQuestionnaire()))
                .collect(Collectors.toList());
    }

    public void addExcelReport(S3FileCreationDto dto) throws NotFoundException {
        var report = fileRepository.save(S3File.builder().link(dto.getLink()).key(dto.getKey()).build());
        var request = requestRepository.findById(dto.getRequestId()).orElseThrow(NotFoundException::new);
        request.setExcelReport(report);
        requestRepository.save(request);
    }

    public Date closeNow(UUID requestId) throws NotFoundException {
        var request = requestRepository
                .findById(requestId)
                .orElseThrow(() -> new NotFoundException("Request not found"));

        request.setCloseDate(new Date());
        return requestRepository.save(request).getCloseDate();
    }

    public List<RequestShortDto> getAllByQuestionnaire(UUID id) {
        return requestRepository.findAllByQuestionnaireId(id)
                .stream()
                .map(RequestMapper.MAPPER::requestToShortDto)
                .collect(Collectors.toList());
    }

}
