package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.questionnaire.model.Questionnaire;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestionnaireRepository extends JpaRepository<Questionnaire, UUID> {
    List<Questionnaire> findAllByCompanyId(UUID companyId, Pageable pageable);

    Long countAllByCompanyId(UUID companyId);

    boolean existsByTitleAndCompanyIdAndIdIsNot(String title, UUID CompanyId, UUID id);
    boolean existsByTitleAndCompanyId(String title, UUID CompanyId);
}
