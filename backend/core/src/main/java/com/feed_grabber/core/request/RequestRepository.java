package com.feed_grabber.core.request;

import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RequestRepository extends JpaRepository<Request, UUID> {
    List<Request> findAllByResponsesUserId(UUID id);

    @Query("SELECT case when " +
            "   (EXISTS (" +
            "       SELECT t " +
            "       FROM u.teams t " +
            "       WHERE t.lead.id = :userId" +
            "   )) " +
            "   then true else false end " +
            "FROM User u " +
            "WHERE u.id = :targetId")
    boolean isTeamLeadOfTargetUser(UUID targetId, UUID userId);

    @Query("select r from Request r where r.id = :id and r.targetUser.id = :targetUser")
    Optional<Request> findByIdAndTargetUser(UUID id, UUID targetUser);

    @Query("select r from Request r " +
            "join Response responses on responses.request.id = r.id where " +
            "responses.user.id = :id and " +
            "responses.payload is NULL or responses.payload = '' " +
            "and r.closeDate is NULL")
    List<Request> findAllUnansweredByRespondentId(UUID id);

    List<Request> findAllByQuestionnaireId(UUID id);

    @Query("SELECT r " +
            "FROM Request r " +
            "WHERE r.targetUser is not NULL AND " +
            "      EXISTS (SELECT t FROM r.targetUser.teams t WHERE t.id = :id)")
    List<Request> findAllByTeamId(UUID id);

    @Query("select r from Request r where r.closeDate is not NULL and r.questionnaire.company.id = :companyId")
    List<Request> findAllReports(UUID companyId);

    @Query("select r from Request r " +
            "where r.closeDate is not null " +
            "and r.sendToTarget = true and r.targetUser.id = :userId")
    List<Request> findReportsForEmployee(UUID userId);

    boolean existsByCloseDateIsNotNullAndId(UUID id);

    List<Request> findByTargetUserIdAndCloseDateIsNotNull(UUID targetUser);
}
