package com.feed_grabber.core.team;

import com.feed_grabber.core.team.dto.TeamDetailsDto;
import com.feed_grabber.core.team.dto.TeamDto;
import com.feed_grabber.core.team.dto.TeamShortDto;
import com.feed_grabber.core.team.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
    List<TeamShortDto> findAllByCompanyId(UUID companyId);

    Optional<Team> findOneByCompanyIdAndId(UUID companyId, UUID id);

    Optional<Team> findOneByCompanyIdAndNameAndIdIsNot(UUID companyId, String name, UUID id);

    boolean existsByName(String name);

    @Query(nativeQuery = true,
            value = "SELECT (EXISTS( " +
                    "SELECT * " +
                    "FROM users_teams ut " +
                    "WHERE ut.team_id = :teamId AND ut.user_id = :userId))")
    boolean existsUser(UUID teamId, UUID userId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "INSERT INTO users_teams (user_id, team_id) " +
                    "VALUES (:userId, :teamId)")
    void addUser(UUID teamId, UUID userId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "DELETE FROM users_teams ut " +
                    "WHERE ut.team_id = :teamId AND ut.user_id = :userId")
    void deleteUser(UUID teamId, UUID userId);
}
