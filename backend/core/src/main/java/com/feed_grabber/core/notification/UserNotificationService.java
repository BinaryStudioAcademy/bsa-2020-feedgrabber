package com.feed_grabber.core.notification;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.notification.dto.NotificationResponseDto;
import com.feed_grabber.core.notification.exceptions.UnableToDeleteNotificationException;
import com.feed_grabber.core.response.ResponseRepository;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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

    public List<NotificationResponseDto> getAllByUser(UUID userId){
        return userNotificationRepository.findAllActiveNotificationsByUser(userId);
    }

    public void deleteNotificationByResponseIdAndUserId(UUID responseId, UUID userId) throws NotFoundException,
            UnableToDeleteNotificationException {
        var response = responseRepository
                .findById(responseId)
                .orElseThrow(() -> new NotFoundException("Response Not Found"));
        System.out.println(responseId);
        System.out.println(userId);
        if(!userId.equals(response.getUser().getId())) {
            throw new UnableToDeleteNotificationException();
        }

        response.setNotificationExists(false);
        responseRepository.save(response);
    }
}
