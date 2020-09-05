package com.feed_grabber.core.question;

import com.feed_grabber.core.question.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, UUID> {
    @Query("SELECT q FROM Questionnaire q " +
            "INNER JOIN q.sections s " +
            "INNER JOIN s.questions ques " +
            "WHERE q.id = :questionnaireId")
    List<Question> findAllByQuestionnaireId(@Param("questionnaireId") UUID questionnaireId);

    @Query("from Question q " +
            "inner join SectionQuestion sq on q.id = sq.question.id " +
            "inner join Section s on sq.section.id = s.id " +
            "where s.id = :sectionId order by sq.orderIndex asc ")
    List<Question> findAllBySectionId(UUID sectionId);
}
