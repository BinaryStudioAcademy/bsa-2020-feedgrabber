package com.feed_grabber.core.notification;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.notification.dto.NotificationResponseDto;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/user-notifications")
public class UserNotificationController {

    @Autowired
    private UserNotificationService userNotificationService;

    @ApiOperation("Get all notifications for user from token")
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<NotificationResponseDto>> getAllByUser() {
        UUID userId = TokenService.getUserId();
        return new AppResponse<>(userNotificationService.getAllByUser(userId));
    }

    @ApiOperation("Delete notification for user from token by requestId")
    @DeleteMapping("/delete/{requestId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNotification(@PathVariable UUID requestId) throws NotFoundException {
        UUID userId = TokenService.getUserId();
        userNotificationService.deleteNotificationByRequestIdAndUserId(requestId, userId);
    }

    @ApiOperation("Delete all notifications for user from token")
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNotificationsAll() {
        UUID userId = TokenService.getUserId();
        userNotificationService.deleteAllNotificationsByUserId(userId);
    }

    @ApiOperation("Mark notification as read")
    @PutMapping("/{id}/read")
    @ResponseStatus(HttpStatus.OK)
    public void readNotification(@PathVariable UUID notificationId) throws NotFoundException {
        userNotificationService.markAsRead(notificationId);
    }

}
