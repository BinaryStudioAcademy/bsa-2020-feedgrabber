package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.questionnaire.model.Questionnaire;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestionnaireRepository extends JpaRepository<Questionnaire, UUID> {
    List<Questionnaire> findAllByCompanyIdAndDeleted(UUID companyId, boolean isDeleted, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Questionnaire q SET q.isDeleted = true WHERE q.id = :id")
    void softDeleteById(UUID id);

    Long countAllByCompanyIdAndDeleted(UUID companyId, boolean isDeleted);

    boolean existsByTitleAndCompanyIdAndIdIsNot(String title, UUID CompanyId, UUID id);

    boolean existsByTitleAndCompanyId(String title, UUID CompanyId);

    @Query("select q from Questionnaire q join Request r on q = r.questionnaire" +
            " join User u on u.id = :id where q.isDeleted = false ")
    List<Questionnaire> findAllByRespondentId(UUID id);

    @Query("select distinct r.questionnaire from Request r " +
            "where r.questionnaire.id = :questionnaireId " +
            "and r.closeDate is null and r.questionnaire.isDeleted = false ")
    Optional<Questionnaire> findByAllClosedRequests(UUID questionnaireId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "DELETE FROM question_questionnaire qq " +
                    "WHERE qq.questionnaire_id = :questionnaireId AND qq.question_id = :questionId")
    void deleteQuestion(UUID questionnaireId, UUID questionId);
}
