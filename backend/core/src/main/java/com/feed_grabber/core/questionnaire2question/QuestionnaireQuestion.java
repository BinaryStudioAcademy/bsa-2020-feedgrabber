package com.feed_grabber.core.questionnaire2question;

import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "question_questionnaire")
public class QuestionnaireQuestion {

    @EmbeddedId
    private QuestionnaireQuestionId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("questionId")
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("questionnaireId")
    private Questionnaire questionnaire;

    @Column(name = "order_index")
    private Integer index;

    static public QuestionnaireQuestion getFromEntities(Question question, Questionnaire questionnaire, Integer index) {
        return new QuestionnaireQuestion(
                new QuestionnaireQuestionId(questionnaire. getId(), question.getId()),
                question,
                questionnaire,
                index
        );
    }
}
