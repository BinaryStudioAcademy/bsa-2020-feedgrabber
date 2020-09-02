package com.feed_grabber.core.notification.model;

import com.feed_grabber.core.notification.MessageTypes;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_notifications")
public class UserNotification {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "text")
    private String text;

    @OneToOne(cascade = {CascadeType.REMOVE, CascadeType.REFRESH})
    @JoinColumn(name = "request_id", referencedColumnName = "id")
    private Request request;

    @Column(name = "is_read")
    private Boolean isRead;

    @Column(name = "is_closed")
    private Boolean isClosed;

    @Column(name = "message_type")
    @Enumerated(EnumType.STRING)
    private MessageTypes type;

    private String payload;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
