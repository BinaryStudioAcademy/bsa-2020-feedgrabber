package com.feed_grabber.core.request;

import com.feed_grabber.core.request.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RequestRepository extends JpaRepository<Request, UUID> {
    List<Request> findAllByResponsesUserId(UUID id);
}
