package com.feed_grabber.core.registration.model;

import com.feed_grabber.core.user.model.User;


import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "verification_token")
public class VerificationToken {
    private static long EXPIRATION_TIME_MILLIS = 86_400_000; // 24hours

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "token")
    private String token;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    public VerificationToken(String token, User user) {
        this.token = token;
        this.user = user;
        expirationDate = new Date(System.currentTimeMillis() + EXPIRATION_TIME_MILLIS);
    }
}
