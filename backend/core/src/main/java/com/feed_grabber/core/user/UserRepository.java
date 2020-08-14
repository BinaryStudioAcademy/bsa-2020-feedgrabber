package com.feed_grabber.core.user;

import com.feed_grabber.core.user.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    List<User> findAllByCompanyId(UUID companyId);

    Long countAllByCompanyId(UUID companyId);

    List<User> findAllByCompanyId(UUID companyId, Pageable pageable);

}
