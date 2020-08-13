package com.feed_grabber.core.invitation;

import com.feed_grabber.core.invitation.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {
    Optional<Invitation> findByCompanyId(UUID companyId);

    @Transactional
    @Modifying
    void deleteByCompanyId(UUID companyId);
}
