package com.feed_grabber.core.notification;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.notification.dto.NotificationResponseDto;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/user-notifications")
public class UserNotificationController {

    @Autowired
    private UserNotificationService userNotificationService;


//    @GetMapping("/all")
//    public AppResponse<List<NotificationResponseDto>> getAllByUser() throws UserNotFoundException {
//        UUID userId = TokenService.getUserId();
//        return new AppResponse<>(userNotificationService.getAllByUser(userId));
//    }

    @GetMapping("/all")
    public AppResponse<UUID> getAllByUser() throws UserNotFoundException {
        UUID userId = TokenService.getUserId();
        return new AppResponse<>(userId);
    }
}
