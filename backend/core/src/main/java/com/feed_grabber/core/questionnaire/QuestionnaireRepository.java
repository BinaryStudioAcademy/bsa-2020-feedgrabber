package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.questionnaire.model.Questionnaire;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestionnaireRepository extends JpaRepository<Questionnaire, UUID> {
    List<Questionnaire> findAllByCompanyIdAndArchived(UUID companyId, boolean archived, Pageable pageable);

    Long countAllByCompanyIdAndArchived(UUID companyId, boolean archived);

    boolean existsByTitleAndCompanyIdAndIdIsNot(String title, UUID CompanyId, UUID id);
    boolean existsByTitleAndCompanyId(String title, UUID CompanyId);

    @Query("select q from Questionnaire q join Request r on q = r.questionnaire" +
            " join User u on u.id = :id")
    List<Questionnaire> findAllByRespondentId(UUID id);

    @Query("select distinct r.questionnaire from Request r " +
            "where r.questionnaire.id = :questionnaireId " +
            "and r.closeDate is null")
    Optional<Questionnaire> findByAllClosedRequests(UUID questionnaireId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "DELETE FROM question_questionnaire qq " +
                    "WHERE qq.questionnaire_id = :questionnaireId AND qq.question_id = :questionId")
    void deleteQuestionFromQuestionnaire(UUID questionnaireId, UUID questionId);
}
