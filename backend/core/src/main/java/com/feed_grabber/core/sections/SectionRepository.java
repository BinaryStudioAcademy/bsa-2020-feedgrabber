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




//    @Query("from Section s left join SectionQuestion sq on s.id = sq.section.id " +
//            "left join Question q on sq.question.id = q.id order by sq.orderIndex")

//        @Query("select new com.feed_grabber.core.sections.model.Section(s.id, s.title, s.description, s.order, " +
//            "s.questionnaire,  " +
//            "(select sq from SectionQuestion inner join Question q on q.id = sq.question.id inner join Section sec on " +
//            "where sq.section.id = s.id " +
//            " order by sq.orderIndex ) as qustions )" +
//            "from Section s inner join s.questionnaire where s.questionnaire.id = :id")

    List<Section> findByQuestionnaireIdOrderByOrder(UUID id);

    @Query("select s from Section s join s.questions q " +
            "where q.id = :questionId and s.questionnaire.id = :questionnaireId")
    Section findByQuestionnaireIdAndQuestionId(UUID questionnaireId, UUID questionId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "INSERT INTO sections_questions (section_id, question_id, order_index) " +
                    "VALUES (:sectionId, :questionId, :index)")
    void addQuestion(UUID sectionId, UUID questionId, Integer index);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "DELETE FROM sections_questions s " +
                    "WHERE s.section_id = :sectionId AND s.question_id = :questionId")
    void deleteQuestion(UUID sectionId, UUID questionId);

    @Modifying
    @Transactional
    @Query(
            value = "UPDATE SectionQuestion s SET s.orderIndex = :index " +
                    "WHERE s.section.id = :sectionId AND s.question.id = :questionId")
    void setIndex(UUID sectionId, UUID questionId, Integer index);
}
