package com.feed_grabber.core.report;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.feed_grabber.core.config.NotificationService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.notification.MessageTypes;
import com.feed_grabber.core.notification.UserNotificationRepository;
import com.feed_grabber.core.notification.model.UserNotification;
import com.feed_grabber.core.rabbit.Sender;
import com.feed_grabber.core.report.dto.ReportDetailsDto;
import com.feed_grabber.core.request.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
public class ReportService {
    private final RequestRepository requestRepository;
    private final NotificationService notificationService;
    private final UserNotificationRepository userNotificationRepository;
    private final RestTemplate template = new RestTemplate();
    private final Sender sender;

    @Value("${ep.host}")
    private String EP;

    @Autowired
    public ReportService(RequestRepository requestRepository,NotificationService notificationService,UserNotificationRepository userNotificationRepository, Sender sender) {
        this.requestRepository = requestRepository;
        this.userNotificationRepository = userNotificationRepository;
        this.notificationService = notificationService;
        this.sender = sender;
    }

    public void sendExcelReportGenerationRequest(UUID requestId) {
        sender.sendExcelReportGenerationRequest(requestId);
    }

    public ReportDetailsDto getDataForReport(UUID requestId) throws NotFoundException {
        var request = requestRepository.findById(requestId).orElseThrow(NotFoundException::new);
        return ReportMapper.MAPPER.requestToReportDetails(request);
    }

    public boolean isRequestClosed(UUID requestId) {
        return requestRepository.existsByCloseDateIsNotNullAndId(requestId);
    }

    public String generateReport(UUID requestId) throws NotFoundException, JsonProcessingException {
        var body = new ObjectMapper().writeValueAsString(getDataForReport(requestId));
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        var result = template.postForObject(EP.concat("/report"), new HttpEntity<>(body, headers), String.class);
        var request = requestRepository.findById(requestId).orElseThrow(NotFoundException::new);
        var requestMaker = request.getRequestMaker();
        notificationService.sendMessageToConcreteUser(
                requestMaker.getId().toString(),
                "notify",
                userNotificationRepository
                        .findNotificationById(userNotificationRepository.save(UserNotification
                                .builder()
                                .request(request)
                                .text("Web report generated")
                                .seen(false)
                                .type(MessageTypes.plain_text)
                                .user(requestMaker)
                                .build()).getId())
                        .toString()
        );
        return result;
    }

    public String getReport(UUID requestId) {
        return template.getForObject(EP + "/report/" + requestId, String.class);
    }
}
