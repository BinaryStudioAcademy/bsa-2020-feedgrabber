package com.feed_grabber.core.team;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.team.dto.*;
import com.feed_grabber.core.team.exceptions.TeamExistsException;
import com.feed_grabber.core.team.exceptions.TeamNotFoundException;
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
    private CompanyRepository companyRepository;
    @Autowired
    private UserRepository userRepository;

    public List<TeamShortDto> getAllByCompany_Id(UUID companyId) {

        return teamRepository
                .findAllByCompanyId(companyId);
    }

    public TeamDetailsDto getOne(UUID companyId, UUID id) throws TeamNotFoundException {
        var team = teamRepository.findOneByCompanyIdAndId(companyId, id)
                .orElseThrow(TeamNotFoundException::new);

        var ids = team.getUsers()
                .stream()
                .map(User::getId)
                .collect(Collectors.toList());

        return new TeamDetailsDto(team.getId(), team.getName(), ids);
    }

    public Optional<TeamDto> getById(UUID id) {
        return teamRepository.findById(id)
                .map(TeamMapper.MAPPER::teamToTeamDto);
    }

    public TeamDto update(UpdateTeamDto teamDto) throws TeamNotFoundException, TeamExistsException {
        var existing =
                teamRepository.findOneByCompanyIdAndNameAndIdIsNot(
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
            teamRepository.deleteUser(teamId, userId);
            return new ResponseUserTeamDto(teamId, userId, false);
        } else {
            teamRepository.addUser(teamId, userId);
            return new ResponseUserTeamDto(teamId, userId, true);
        }
    }

    public TeamDetailsDto create(UpdateTeamDto teamDto) throws AlreadyExistsException {

        if (teamRepository.existsByNameAndCompanyId(teamDto.getName(), teamDto.getCompanyId())) {
            throw new AlreadyExistsException("Such team already exists in this company");
        }

        Team t = TeamMapper.MAPPER.teamDtoToModel(teamDto);
        t = teamRepository.save(t);

        return new TeamDetailsDto(t.getId(), t.getName(), Collections.emptyList());
    }

    public void delete(UUID id, UUID companyId) {
        teamRepository.deleteByIdAndCompanyId(id, companyId);
    }
}
