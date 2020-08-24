package com.feed_grabber.core.request.model;

import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.response.model.Response;
import com.feed_grabber.core.user.model.User;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "questionnaire_id", nullable = false)
    private Questionnaire questionnaire;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "target_user_id")
    private User targetUser;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "request_maker_id", nullable = false)
    private User requestMaker;

    @OneToMany(mappedBy = "request", cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    private List<Response> responses;

    @Column(name = "creation_date")
    @CreationTimestamp
    private Date creationDate;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "notify_users")
    private Boolean notifyUsers;

    @Column(name = "generate_report")
    private Boolean generateReport;

    @Column
    private Boolean isClosed;
}
