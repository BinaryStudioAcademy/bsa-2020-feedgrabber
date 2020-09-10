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
                    "un.id, un.text, un.request.creationDate, un.request.id, res.id, un.request.questionnaire.id, un.type, un.payload, un.isRead) " +
                    "from UserNotification un, Response res " +
                    "WHERE " +
                    "un.user.id = :userId and " +
                    "un.isClosed = false and res.user.id = :userId and res.request.id = un.request.id"
    )
    List<NotificationResponseDto> findAllActiveNotificationsByUser(UUID userId);

    @Query(
            value = "SELECT " +
                    "new com.feed_grabber.core.notification.dto.NotificationResponseDto(" +
                    "un.id, un.text, un.request.creationDate, un.request.id, res.id, un.request.questionnaire.id, un.type, un.payload, un.isRead) " +
                    "from UserNotification un, Response res " +
                    "WHERE " +
                    "un.id = :notificationId and res.user.id = un.user.id and res.request.id = un.request.id"
    )
    Optional<NotificationResponseDto> findNotificationById(UUID notificationId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE UserNotification un " +
            "SET un.isClosed = true WHERE un.user.id = :userId")
    void deleteAllNotificationsByUserId(UUID userId);

}
