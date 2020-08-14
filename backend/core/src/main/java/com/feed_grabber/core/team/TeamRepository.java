package com.feed_grabber.core.team;

import com.feed_grabber.core.team.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TeamRepository extends JpaRepository<Team, UUID> {
    public List<Team> findAllByCompanyId(UUID companyId);

    boolean existsByName(String name);
}
