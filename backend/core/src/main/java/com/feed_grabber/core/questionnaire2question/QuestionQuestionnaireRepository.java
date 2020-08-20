package com.feed_grabber.core.questionnaire2question;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;


public interface QuestionQuestionnaireRepository extends JpaRepository<QuestionnaireQuestion, QuestionnaireQuestionId> {
    Optional<QuestionnaireQuestion> findByQuestionIdAndQuestionnaireId(UUID questionId, UUID questionnaireId);
}
