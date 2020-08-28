package com.feed_grabber.core.sections;

import com.feed_grabber.core.sections.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

public interface SectionRepository extends JpaRepository<Section, UUID> {
    @Query("select s from Section s " +
            "where s.questionnaire.id = :id and s.title = :title")
    Section findByQuestionnaireIdAndTitle(UUID id, String title);

    List<Section> findByQuestionnaireId(UUID id);

    @Query("select s from Section s join s.questions q " +
            "where q.id = :questionId and s.questionnaire.id = :questionnaireId")
    Section findByQuestionnaireIdAndQuestionId(UUID questionnaireId, UUID questionId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "INSERT INTO sections_questions (section_id, question_id, order_index) " +
                    "VALUES (:sectionId, :questionId, :index)")
    Integer addQuestion(UUID sectionId, UUID questionId, Integer index);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "DELETE FROM sections_questions s " +
                    "WHERE s.section_id = :sectionId AND s.question_id = :questionId")
    Integer deleteQuestion(UUID sectionId, UUID questionId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "UPDATE sections_questions s SET order_index = :index " +
                    "WHERE s.section_id = :sectionId AND s.question_id = :questionId")
    Integer setIndex(UUID sectionId, UUID questionId, Integer index);
}
