package com.feed_grabber.core.notification.model;

import com.feed_grabber.core.notification.MessageTypes;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.user.model.User;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.ManyToAny;

import javax.persistence.*;
import java.util.UUID;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_notifications")
public class UserNotification {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "text")
    private String text;

    private Boolean seen;

    @Column(name = "message_type")
    @Enumerated(EnumType.STRING)
    private MessageTypes type;

    @Nullable
    private String link;

    @OneToOne
    @JoinColumn(name = "request_id", referencedColumnName = "id")
    private Request request;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
