package com.feed_grabber.core.response;

import com.feed_grabber.core.response.model.Response;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ResponseRepository extends JpaRepository<Response, UUID> {

    Response findByRequestAAndUser(UUID requestId, UUID userId);
}
