package com.feed_grabber.core.questionnaire2question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;


public interface QuestionQuestionnaireRepository extends JpaRepository<QuestionnaireQuestion, QuestionnaireQuestionId> {
    Optional<QuestionnaireQuestion> findByQuestionIdAndQuestionnaireId(UUID questionId, UUID questionnaireId);

    @Transactional
    @Modifying
    @Query(value = "delete from question_questionnaire q " +
            "where q.questionnaire_id = :questionnaireId and q.question_id = :questionId ", nativeQuery = true)
    void deleteByQuestionIdAndQuestionnaireId(
            @Param("questionId")UUID questionId,
            @Param("questionnaireId") UUID questionnaireId
    );
}
