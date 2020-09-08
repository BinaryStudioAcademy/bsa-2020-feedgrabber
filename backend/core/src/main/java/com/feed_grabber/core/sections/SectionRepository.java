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

    List<Section> findByQuestionnaireIdOrderByOrder(UUID id);

    @Query("select s from Section s inner join SectionQuestion sq on sq.section.id = s.id " +
            " inner join Question q on sq.question.id = q.id " +
            "inner join s.questionnaire qq " +
            "where q.id = :questionId and qq.id = :questionnaireId")
    Section findByQuestionnaireIdAndQuestionId(UUID questionnaireId, UUID questionId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "INSERT INTO sections_questions (section_id, question_id, order_index) " +
                    "VALUES (:sectionId, :questionId, :index)")
    Integer addQuestion(UUID sectionId, UUID questionId, Integer index);

    @Transactional
    @Query(nativeQuery = true,
            value = "DELETE FROM sections_questions " +
                    "WHERE section_id = :sectionId AND question_id = :questionId " +
                    "RETURNING order_index")
    Integer deleteQuestion(UUID sectionId, UUID questionId);

    @Modifying
    @Transactional
    @Query("UPDATE SectionQuestion s set s.orderIndex = s.orderIndex - 1 where s.section.id = :sectionId and " +
            "s.orderIndex > :index")
    void shiftIndexesLeft(UUID sectionId, Integer index);

    @Modifying
    @Transactional
    @Query(
            value = "UPDATE SectionQuestion s SET s.orderIndex = :index " +
                    "WHERE s.section.id = :sectionId AND s.question.id = :questionId")
    Integer setIndex(UUID sectionId, UUID questionId, Integer index);
}
