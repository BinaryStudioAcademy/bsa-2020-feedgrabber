package com.feed_grabber.core.sections.model;

import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.user.model.User;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "sections")
public class Section {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "order_number", columnDefinition = "integer default 1")
    private Integer order;

    @Column(name = "from_question_index")
    private Integer from;

    @Column(name = "to_question_index")
    private Integer to;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "questionnaire_id")
    private Questionnaire questionnaire;

    @ManyToMany(
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(
            name = "sections_questions",
            joinColumns = {@JoinColumn(name = "section_id")},
            inverseJoinColumns = {@JoinColumn(name = "question_id")}
    )
    private List<Question> questions;
}
