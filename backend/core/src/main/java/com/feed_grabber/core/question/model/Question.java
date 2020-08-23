package com.feed_grabber.core.question.model;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.question.QuestionType;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.questionnaire2question.QuestionnaireQuestion;
import com.feed_grabber.core.sections.model.Section;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "text", nullable = false, unique = true)
    private String text;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @Column
    private String payload;

    @OneToMany(
            mappedBy = "question",
            cascade = CascadeType.REFRESH
    )
    private List<QuestionnaireQuestion> questionnaires;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    private QuestionCategory category;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    private Section section;
}
