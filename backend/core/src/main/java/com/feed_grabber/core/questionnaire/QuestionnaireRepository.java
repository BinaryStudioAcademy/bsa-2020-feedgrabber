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
    @Query("SELECT q FROM Questionnaire q inner join q.company c" +
            " where c.id = :companyId and q.archived = :archived and q.isDeleted = false ")
    List<Questionnaire> findAllByCompanyId(UUID companyId, boolean archived, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Questionnaire q SET q.isDeleted = true WHERE q.id = :id")
    void softDeleteById(UUID id);


    @Query("SELECT COUNT(q) FROM Questionnaire q inner join q.company c" +
            " where c.id = :companyId and q.archived = :archived and q.isDeleted = false ")
    Long countAllByCompanyId(UUID companyId, boolean archived);

    @Query("select case when count(q)> 0 then true else false end " +
            "from Questionnaire q inner join Company c on c.id = q.company.id" +
            " where q.title = :title and c.id = :companyId and q.id <> :id and q.isDeleted = false ")
    boolean existsByTitleAndCompanyIdAndIdIsNot(String title, UUID companyId, UUID id);

    @Query("select case when count(q)> 0 then true else false end " +
            "from Questionnaire q inner join Company c on c.id = q.company.id" +
            " where q.title = :title and c.id = :companyId and q.isDeleted = false")
    boolean existsByTitleAndCompanyId(String title, UUID companyId);

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
    void deleteQuestionFromQuestionnaire(UUID questionnaireId, UUID questionId);
}
