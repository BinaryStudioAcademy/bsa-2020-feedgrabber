package com.feed_grabber.core.question.model;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.question.QuestionType;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.sections.model.SectionQuestion;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.search.annotations.*;
import org.hibernate.search.annotations.Index;
import org.hibernate.search.bridge.builtin.EnumBridge;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@Indexed
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

    @Field
    @Analyzer(definition = "autocompleteEdgeAnalyzer")
    @Column(name = "text", nullable = false, unique = true)
    private String text;

    @Field(bridge = @FieldBridge(impl = EnumBridge.class))
    @Analyzer(definition = "autocompleteEdgeAnalyzer")
    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @Column
    private String payload;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @IndexedEmbedded(depth = 2)
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    private QuestionCategory category;

    @IndexedEmbedded(depth = 2, includeEmbeddedObjectId = true)
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(name = "is_required")
    @ColumnDefault("false")
    private boolean isRequired;

    @OneToMany(mappedBy = "question")
    private List<SectionQuestion> sections = new LinkedList<>();
}
