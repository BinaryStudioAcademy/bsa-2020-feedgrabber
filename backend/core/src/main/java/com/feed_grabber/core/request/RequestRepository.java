package com.feed_grabber.core.request;

import com.feed_grabber.core.request.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Repository
public interface RequestRepository extends JpaRepository<Request, UUID> {
    @Query("select r from Request r " +
            "join Response responses on responses.request.id = r.id where " +
            "responses.user.id = :id and " +
            "responses.payload is NULL or responses.payload = '' " +
            "and r.isClosed = false")
    List<Request> findAllUnansweredByRespondentId(UUID id);

    List<Request> findAllByQuestionnaireId(UUID id);

    @Transactional
    @Modifying
    @Query("update Request r set r.isClosed = true where r.id = :id")
    void closeRequest(UUID id);
}
