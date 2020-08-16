package com.feed_grabber.core.team;

import com.feed_grabber.core.team.dto.TeamDetailsDto;
import com.feed_grabber.core.team.dto.TeamDto;
import com.feed_grabber.core.team.dto.TeamShortDto;
import com.feed_grabber.core.team.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TeamRepository extends JpaRepository<Team, UUID> {
    @Query("SELECT new com.feed_grabber.core.team.dto.TeamShortDto(" +
            "   t.id," +
            "   t.name," +
            "   t.users.size" +
            ") " +
            "FROM Team t " +
            "WHERE t.company.id = :companyId")
    public List<TeamShortDto> findAllByCompanyId(UUID companyId);

    public Optional<Team> findOneByCompanyIdAndId(UUID companyId, UUID id);

    public Optional<Team> findOneByCompanyIdAndNameAndIdIsNot(UUID companyId, String name, UUID id);

    boolean existsByName(String name);
}
