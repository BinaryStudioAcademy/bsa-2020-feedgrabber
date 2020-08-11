package com.feed_grabber.core.questionCategory;

import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestionCategoryRepository extends JpaRepository<QuestionCategory, UUID> {
    List<QuestionCategory> findAllByCompanyId(UUID companyId);

    boolean existsByTitleAndCompanyId(String title, UUID CompanyId);

    boolean existsByTitleAndCompanyIdAndIdIsNot(String title, UUID CompanyId, UUID id);

    Optional<QuestionCategory> findByTitle(String title);
}
