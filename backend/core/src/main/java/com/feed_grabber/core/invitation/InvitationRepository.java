package com.feed_grabber.core.invitation;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.invitation.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {
    @Modifying
    @Transactional
    @Query("UPDATE Invitation i " +
            "SET i.accepted = true " +
            "WHERE i.id = :id")
    void acceptById(UUID id);

    List<Invitation> findByCompanyIdOrderByAcceptedAscCreatedAtDesc(UUID companyId);

    Optional<Invitation> findByCompanyIdAndEmail(UUID companyId, String email);

    Optional<Invitation> findByCompanyAndEmail(Company company, String email);

    @Transactional
    @Modifying
    void deleteByCompanyIdAndEmail(UUID companyId, String email);
}
