package com.feed_grabber.core.response;

import com.feed_grabber.core.config.NotificationService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.notification.MessageTypes;
import com.feed_grabber.core.notification.UserNotificationRepository;
import com.feed_grabber.core.notification.model.UserNotification;
import com.feed_grabber.core.request.RequestService;
import com.feed_grabber.core.response.dto.ResponseDto;
import com.feed_grabber.core.response.dto.ResponseUpdateDto;
import com.feed_grabber.core.response.dto.UserResponseShortDto;
import com.feed_grabber.core.response.exceptions.ResponseNotFoundException;
import com.feed_grabber.core.responseDeadline.exceptions.DeadlineExpiredException;
import com.feed_grabber.core.user.model.User;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ResponseService {
    private final ResponseRepository responseRepository;
    private final RequestService requestService;
    private final UserNotificationRepository userNotificationRepository;
    private final NotificationService notificationService;

    public ResponseService(ResponseRepository responseRepository, RequestService requestService, UserNotificationRepository userNotificationRepository, NotificationService notificationService) {
        this.responseRepository = responseRepository;
        this.requestService = requestService;
        this.userNotificationRepository = userNotificationRepository;
        this.notificationService = notificationService;
    }

    public Optional<ResponseDto> getOneByRequestAndUser(UUID requestId, UUID userId) {
        var byRequestIdAndUserId = responseRepository.findByRequestIdAndUserId(requestId, userId);
        return Optional
                .of(ResponseMapper.MAPPER.responseToDto(byRequestIdAndUserId));
    }

    public Optional<ResponseDto> update(ResponseUpdateDto dto) throws DeadlineExpiredException, 
           ResponseNotFoundException,
           NotFoundException {
        var response = responseRepository.findById(dto.getId()).orElseThrow(ResponseNotFoundException::new);
        var request = response.getRequest();
        if (!request.isChangeable() && response.getPayload() != null) {
            return Optional.of(ResponseMapper.MAPPER.responseToDto(response));
        }

        if (Optional.ofNullable(request.getExpirationDate()).isPresent()
                && request.getExpirationDate().compareTo(new Date()) < 0) {
            throw new DeadlineExpiredException(request.getExpirationDate().toString());
        }
        response.setPayload(dto.getPayload());
        response.setAnsweredAt(new Date());

        var result = Optional.of(ResponseMapper.MAPPER.responseToDto(responseRepository.save(response)));

        int unanswered = responseRepository.countUnanswered(request.getId());
        if (unanswered == 0) {
            // close the request
            requestService.closeNow(request.getId());
            requestService.notifyAboutClosing(request);
        }
        return result;
    }

    public ResponseDto getById(UUID responseId) throws ResponseNotFoundException {
        return ResponseMapper
                .MAPPER.responseToDto(responseRepository.findById(responseId)
                        .orElseThrow(ResponseNotFoundException::new));
    }

    public List<UserResponseShortDto> getRespondents(UUID requestId) {
        return responseRepository.findRespondentsByRequestId(requestId);
    }
}
