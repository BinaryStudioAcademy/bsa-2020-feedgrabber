package com.feed_grabber.core.request;

import com.feed_grabber.core.request.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RequestRepository extends JpaRepository<Request, UUID> {
    @Query("select r from Request r " +
            " join r.respondents u on u.id = :id ") //can be chosen more then one duplicate questionnaires
    List<Request> findAllByRespondentId(UUID id);
}
