package com.feed_grabber.core.notification;

import com.feed_grabber.core.notification.dto.NotificationResponseDto;
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
    UserNotificationRepository userNotificationRepository;

    @Autowired
    UserRepository userRepository;

    public List<NotificationResponseDto> getAllByUser(UUID userId) throws UserNotFoundException {
        return userRepository
                .findById(userId)
                .orElseThrow(UserNotFoundException::new)
                .getRequests()
                .stream()
                .map(request -> {
                    if (request.getUserNotification() == null) {
                        return null;
                    } else {
                        return UserNotificationMapper.MAPPER.
                                notificationResponseDtoFromModel(request.getUserNotification());
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}
