package com.feed_grabber.core.questionnaire.model;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.sections.model.Section;
import com.feed_grabber.core.request.model.Request;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "questionnaires")
public class Questionnaire {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "question_questionnaire",
            joinColumns = @JoinColumn(name = "questionnaire_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id"))
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "questionnaire", cascade = CascadeType.ALL)
    private List<Request> requests;

    @ManyToOne(cascade = CascadeType.REFRESH)
    private Company company;

    @OneToMany(mappedBy = "questionnaire")
    private List<Section> sections;

    @Column(name = "is_editing_enabled", nullable = false)
    @ColumnDefault("true")
    private boolean isEditingEnabled = true;
}
