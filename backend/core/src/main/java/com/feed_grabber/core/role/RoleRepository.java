package com.feed_grabber.core.role;

import com.feed_grabber.core.role.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByCompanyIdAndSystemRole(UUID companyId, SystemRole systemRole);

    List<Role> findAllByCompanyId(UUID companyId);
}
