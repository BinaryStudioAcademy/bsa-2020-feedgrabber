package com.feed_grabber.core.questionCategory;

import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuestionCategoryRepository extends JpaRepository<QuestionCategory, UUID> {
    boolean existsByTitleAndCompanyId(String title, UUID CompanyId);

    boolean existsByTitleAndCompanyIdAndIdIsNot(String title, UUID CompanyId, UUID id);
}
