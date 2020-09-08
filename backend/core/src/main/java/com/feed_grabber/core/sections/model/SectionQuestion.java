package com.feed_grabber.core.sections.model;

import com.feed_grabber.core.question.model.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sections_questions")
public class SectionQuestion {
    @EmbeddedId
    SectionQuestionId id;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("questionId")
    @JoinColumn(name = "question_id")
    Question question;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("sectionId")
    @JoinColumn(name = "section_id")
    Section section;

    @Column(name = "order_index")
    Integer orderIndex;
}
