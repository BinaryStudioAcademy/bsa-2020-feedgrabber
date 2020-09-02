package com.feed_grabber.core.notification;

import com.feed_grabber.core.notification.dto.NotificationResponseDto;
import com.feed_grabber.core.notification.model.UserNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserNotificationRepository extends JpaRepository<UserNotification, UUID> {
    @Query(
            value = "SELECT " +
                    "new com.feed_grabber.core.notification.dto.NotificationResponseDto(" +
                    "un.id, un.text, un.request.creationDate, un.request.id, un.request.questionnaire.id, un.type, un.payload, un.isRead) " +
                    "from UserNotification un " +
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

    @Transactional
    @Modifying
    @Query(value = "UPDATE UserNotification un " +
            "SET un.isClosed = true WHERE un.user.id = :userId")
    void deleteAllNotificationsByUserId(UUID userId);

    Optional<UserNotification> findByUserIdAndRequestId(UUID userId,UUID requestId);
}
