package com.feed_grabber.core.questionnaireResponse;

import com.feed_grabber.core.questionnaireResponse.model.QuestionnaireResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface QuestionnaireResponseRepository extends JpaRepository<QuestionnaireResponse, UUID> {
    List<QuestionnaireResponse> findAllByRequest(UUID requestId);

    List<QuestionnaireResponse> findAllByRespondentId(UUID respondentId);

    Optional<QuestionnaireResponse> findByRequestAndRespondentId(UUID request, UUID user);
}
