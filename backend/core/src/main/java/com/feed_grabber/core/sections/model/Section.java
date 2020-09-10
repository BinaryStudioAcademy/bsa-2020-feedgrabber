package com.feed_grabber.core.sections.model;

import com.feed_grabber.core.questionnaire.model.Questionnaire;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.search.annotations.ContainedIn;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.IndexedEmbedded;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@Indexed
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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

    @Column(name = "order_index", columnDefinition = "integer default 1")
    private Integer order;

    @IndexedEmbedded(depth = 2, includeEmbeddedObjectId = true)
    @ManyToOne(cascade = {CascadeType.REMOVE, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinColumn(name = "questionnaire_id")
    private Questionnaire questionnaire;

    @ContainedIn
    @OneToMany(mappedBy = "section")
    private List<SectionQuestion> questions = new LinkedList<>();
}
