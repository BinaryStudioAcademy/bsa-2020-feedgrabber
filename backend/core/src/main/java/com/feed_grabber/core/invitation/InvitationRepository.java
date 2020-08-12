package com.feed_grabber.core.invitation;

import com.feed_grabber.core.invitation.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {
    Optional<Invitation> findByCompanyId(UUID companyId);
    void deleteByCompanyId(UUID companyId);
}
