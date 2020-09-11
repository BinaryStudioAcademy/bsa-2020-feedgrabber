package com.feed_grabber.core.sections.model;

import com.feed_grabber.core.question.model.Question;
import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sections_questions")
public class SectionQuestion {
    @EmbeddedId
    SectionQuestionId id;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("questionId")
    @JoinColumn(name = "question_id")
    Question question;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("sectionId")
    @JoinColumn(name = "section_id")
    Section section;

    @Column(name = "order_index")
    Integer orderIndex;
}
