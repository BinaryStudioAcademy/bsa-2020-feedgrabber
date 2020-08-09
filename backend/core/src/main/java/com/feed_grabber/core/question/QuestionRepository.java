package com.feed_grabber.core.question;

import com.feed_grabber.core.question.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, UUID> {
//    boolean existsByTextAndQuestionnaireIdAndCategoryId
//            (String text, UUID questionnaireId, UUID categoryId);
//
//    boolean existsByTextAndQuestionnaireIdAndCategoryIdAndIdIsNot
//            (String text, UUID questionnaireId, UUID categoryId, UUID id);
}
