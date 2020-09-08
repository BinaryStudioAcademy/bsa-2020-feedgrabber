package com.feed_grabber.core.notification;

import com.feed_grabber.core.config.NotificationService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.notification.dto.NotificationResponseDto;
import com.feed_grabber.core.notification.model.UserNotification;
import com.feed_grabber.core.report.dto.ReportLinksDto;
import com.feed_grabber.core.request.RequestRepository;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserNotificationService {

    @Autowired
    private UserNotificationRepository userNotificationRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    UserRepository userRepository;

    public List<NotificationResponseDto> getAllByUser(UUID userId) {
        return userNotificationRepository.findAllActiveNotificationsByUser(userId);
    }

    public void closeNotification(UUID notificationId) throws NotFoundException {
        var notification = userNotificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotFoundException("Notification Not Found"));
        notification.setIsClosed(true);
        userNotificationRepository.save(notification);
    }

    public void deleteAllNotificationsByUserId(UUID userId) {
        userNotificationRepository.deleteAllNotificationsByUserId(userId);
    }

    public void markAsRead(UUID notificationId) throws NotFoundException {
        var notification = userNotificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotFoundException("Notification Not Found"));
        notification.setIsRead(true);
        userNotificationRepository.save(notification);
    }

    public void saveAndSendReportNotification(ReportLinksDto links) throws NotFoundException {
        var request = requestRepository.findById(links.getRequestId()).orElseThrow(NotFoundException::new);
        var notificationId = userNotificationRepository.save(UserNotification
                .builder()
                .request(request)
                .text("You have new generated reports")
                .isClosed(false)
                .isRead(false)
                .type(MessageTypes.reports)
                .payload(links.getExcelReportLink()+","+links.getPptReportLink())
                .user(request.getRequestMaker())
                .build()).getId();
        var notificationToSend = userNotificationRepository.findNotificationById(notificationId);

        notificationService.sendMessageToConcreteUser(
                request.getRequestMaker().getId().toString(),
                "notify",
                notificationToSend);
    }

    public void saveAndSendResponseNotification(Request request, User user, String text) throws NotFoundException {
        var userNotificationId = userNotificationRepository.save(
                UserNotification
                        .builder()
                        .request(request)
                        .text(text)
                        .isClosed(false)
                        .isRead(false)
                        .type(MessageTypes.plain_text)
                        .user(user)
                        .build()).getId();
        var notificationToSend = userNotificationRepository.findNotificationById(userNotificationId);

        notificationService.sendMessageToConcreteUser(
                user.getId().toString(),
                "notify",
                notificationToSend);
    }
}
