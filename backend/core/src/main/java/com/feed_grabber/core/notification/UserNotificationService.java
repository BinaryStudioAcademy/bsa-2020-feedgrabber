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

@Service
public class UserNotificationService {

    private UserNotificationRepository userNotificationRepository;

    private UserRepository userRepository;

    @Autowired
    public UserNotificationService(UserNotificationRepository userNotificationRepository, UserRepository userRepository) {
        this.userNotificationRepository = userNotificationRepository;
        this.userRepository = userRepository;
    }

    public List<NotificationResponseDto> getAllByUser(UUID userId) {
        return userNotificationRepository.findAllActiveNotificationsByUser(userId);
    }

    public void deleteNotification(UUID notificationId) throws NotFoundException {
        var notification = userNotificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotFoundException("Notification Not Found"));

        notification.setSeen(true);
        userNotificationRepository.save(notification);
    }
}
