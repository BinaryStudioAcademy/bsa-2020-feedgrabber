package com.feed_grabber.core.questionnaire2question;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Embeddable
public class QuestionnaireQuestionId implements Serializable {
    @Column(name = "questionnaire_id")
    private UUID questionnaireId;

    @Column(name = "question_id")
    private UUID questionId;
}

