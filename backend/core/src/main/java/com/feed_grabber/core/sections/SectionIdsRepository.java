package com.feed_grabber.core.sections;

import com.feed_grabber.core.sections.model.SectionQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.UUID;

public interface SectionIdsRepository extends JpaRepository<SectionQuestion, UUID> {
    @Modifying
    @Transactional
    @Query("UPDATE SectionQuestion s set s.section.id = :newSection, s.orderIndex = :index " +
            "where s.question.id = :questionId and s.section.id = :oldSection")
    void moveQuestionToAnotherSection(UUID questionId, UUID oldSection, UUID newSection, Integer index);
}
