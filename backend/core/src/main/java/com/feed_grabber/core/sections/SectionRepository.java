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

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "INSERT INTO sections_questions (section_id, question_id) " +
                    "VALUES (:sectionId, :questionId)")
    Integer addQuestion(UUID sectionId, UUID questionId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "DELETE FROM sections_questions s" +
                    "WHERE s.section_id = :sectionId AND s.question_id = :questionId")
    Integer deleteQuestion(UUID sectionId, UUID questionId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "update sections s set from_question_index = :from where s.id = :id")
    void updateFrom(UUID id, Integer from);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "update sections s set to_question_index = :to where s.id = :id")
    void updateTo(UUID id, Integer to);
}
