package com.feed_grabber.core.notification.model;

import com.feed_grabber.core.request.model.Request;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Data
@Entity
@Table(name = "user_notifications")
public class UserNotification {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "text")
    private String text;

    @OneToOne
    @JoinColumn(name = "request_id", referencedColumnName = "id")
    private Request request;
}
