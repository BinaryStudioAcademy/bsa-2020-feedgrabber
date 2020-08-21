package com.feed_grabber.core.response;

import com.feed_grabber.core.response.model.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ResponseRepository extends JpaRepository<Response, UUID> {
    @Query("select r from Response r " +
            "where r.user.id = :userId and r.request.id = :requestId")
    Response findByRequestAndUser(UUID requestId, UUID userId);
}
