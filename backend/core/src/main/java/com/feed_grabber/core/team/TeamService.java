package com.feed_grabber.core.team;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.team.dto.*;
import com.feed_grabber.core.team.exceptions.TeamExistsException;
import com.feed_grabber.core.team.exceptions.TeamNotFoundException;
import com.feed_grabber.core.team.exceptions.TeamUserLeadNotFoundException;
import com.feed_grabber.core.team.model.Team;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserRepository userRepository;

    public List<TeamShortDto> getAllByCompany_Id(UUID companyId) {
        return teamRepository.findAllByCompanyId(companyId);
    }

    public TeamDetailsDto getOne(UUID companyId, UUID id) throws TeamNotFoundException {
        var team = teamRepository.findOneByCompanyIdAndId(companyId, id)
                .orElseThrow(TeamNotFoundException::new);

        var ids = team.getUsers()
                .stream()
                .map(User::getId)
                .collect(Collectors.toList());

        UUID teamLeadId = null;
        if (team.getLead() != null) {
            teamLeadId = team.getLead().getId();
        }

        return new TeamDetailsDto(team.getId(), team.getName(), teamLeadId, ids);
    }

    public TeamDto update(RequestTeamDto teamDto) throws TeamNotFoundException, TeamExistsException {
        var existing = teamRepository.findOneByCompanyIdAndNameAndIdIsNot(
                teamDto.getCompanyId(), teamDto.getName(), teamDto.getId()
        );
        if (existing.isPresent()) {
            throw new TeamExistsException();
        }

        return teamRepository.findOneByCompanyIdAndId(teamDto.getCompanyId(), teamDto.getId())
                .map(team -> {
                    team.setName(teamDto.getName());
                    teamRepository.save(team);
                    return team;
                })
                .map(TeamMapper.MAPPER::teamToTeamDto)
                .orElseThrow(TeamNotFoundException::new);
    }

    public ResponseUserTeamDto toggleUser(RequestUserTeamDto requestDto) throws TeamNotFoundException, UserNotFoundException {
        var team = teamRepository
                .findOneByCompanyIdAndId(requestDto.getCompanyId(), requestDto.getTeamId())
                .orElseThrow(TeamNotFoundException::new);
        var user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(UserNotFoundException::new);

        var teamId = team.getId();
        var userId = user.getId();

        if (teamRepository.existsUser(teamId, userId)) {
            if (team.getLead() != null && team.getLead().getId().equals(userId)) {
                team.setLead(null);
                teamRepository.save(team);
            }
            teamRepository.deleteUser(teamId, userId);
            return new ResponseUserTeamDto(teamId, userId, false);
        } else {
            teamRepository.addUser(teamId, userId);
            return new ResponseUserTeamDto(teamId, userId, true);
        }
    }

    public ResponseTeamLeadDto toggleLead(RequestTeamLeadDto requestDto) throws TeamNotFoundException, UserNotFoundException, TeamUserLeadNotFoundException {
        var team = teamRepository
                .findOneByCompanyIdAndId(requestDto.getCompanyId(), requestDto.getTeamId())
                .orElseThrow(TeamNotFoundException::new);
        var user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(UserNotFoundException::new);

        var teamId = team.getId();
        var userId = user.getId();

        if (!teamRepository.existsUser(teamId, userId)) {
            throw new TeamUserLeadNotFoundException();
        }

        if (team.getLead() != null && team.getLead().getId().equals(userId)) {
            team.setLead(null);
            teamRepository.save(team);
            return new ResponseTeamLeadDto(null);
        } else {
            team.setLead(user);
            teamRepository.save(team);
            return new ResponseTeamLeadDto(userId);
        }
    }

    public TeamDetailsDto create(RequestTeamDto teamDto) throws AlreadyExistsException {
        if (teamRepository.existsByNameAndCompanyId(teamDto.getName(), teamDto.getCompanyId())) {
            throw new AlreadyExistsException("Such team already exists in this company");
        }

        Team team = TeamMapper.MAPPER.teamDtoToModel(teamDto);
        team = teamRepository.save(team);

        return new TeamDetailsDto(team.getId(), team.getName(), null, Collections.emptyList());
    }

    public void delete(UUID id, UUID companyId) {
        teamRepository.deleteByIdAndCompanyId(id, companyId);
    }
}
