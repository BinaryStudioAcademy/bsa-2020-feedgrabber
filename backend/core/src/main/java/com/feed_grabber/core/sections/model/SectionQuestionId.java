package com.feed_grabber.core.sections.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SectionQuestionId implements Serializable {
    @Column(name = "section_id")
    UUID sectionId;

    @Column(name = "question_id")
    UUID questionId;
}
