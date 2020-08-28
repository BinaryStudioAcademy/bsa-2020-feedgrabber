package com.feed_grabber.core.notification;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.notification.dto.NotificationResponseDto;
import com.feed_grabber.core.response.ResponseRepository;
import com.feed_grabber.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserNotificationService {

    @Autowired
    private UserNotificationRepository userNotificationRepository;

    @Autowired
    private ResponseRepository responseRepository;

    @Autowired
    UserRepository userRepository;

    public List<NotificationResponseDto> getAllByUser(UUID userId) {
        return userNotificationRepository.findAllActiveNotificationsByUser(userId);
    }

    public void deleteNotificationByRequestIdAndUserId(UUID requestId, UUID userId) throws NotFoundException {
        var response = Optional.of(responseRepository
                .findByRequestAndUser(requestId, userId))
                .orElseThrow(() -> new NotFoundException("Response Not Found"));

        response.setNotificationExists(false);
        responseRepository.save(response);
    }

    public void deleteAllNotificationsByUserId(UUID userId) {
        responseRepository.deleteAllNotificationsByUserId(userId);
    }

    public void markAsRead(UUID id) throws NotFoundException {
        var notification = userNotificationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Notification Not Found"));
        notification.setIsRead(true);
        userNotificationRepository.save(notification);
    }
}
