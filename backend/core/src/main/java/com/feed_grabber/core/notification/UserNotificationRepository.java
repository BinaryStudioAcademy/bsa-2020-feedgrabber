package com.feed_grabber.core.notification;

import com.feed_grabber.core.notification.dto.NotificationResponseDto;
import com.feed_grabber.core.notification.model.UserNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserNotificationRepository extends JpaRepository<UserNotification, UUID> {
    @Query(
            value = "SELECT " +
                    "new com.feed_grabber.core.notification.dto.NotificationResponseDto(" +
                    "un.id, un.text, un.request.creationDate, un.request.id, q.id, un.type, un.payload, un.isRead) " +
                    "from UserNotification un, Response res, User u, Questionnaire q " +
                    "WHERE " +
                    "un.user.id = :userId and " +
                    "un.isClosed = false "

    )
    List<NotificationResponseDto> findAllActiveNotificationsByUser(UUID userId);

    @Query(
            value = "SELECT " +
                    "new com.feed_grabber.core.notification.dto.NotificationResponseDto(" +
                    "un.id, un.text, un.request.creationDate, un.request.id, un.request.questionnaire.id, un.type, un.payload, un.isRead) " +
                    "from UserNotification un " +
                    "WHERE " +
                    "un.id = :notificationId"
    )
    Optional<NotificationResponseDto> findNotificationById(UUID notificationId);

    void deleteAllNotificationsByUserId(UUID userId);

    Optional<UserNotification> findByUserIdAndRequestId(UUID userId,UUID requestId);
}
