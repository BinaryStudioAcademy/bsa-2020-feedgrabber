package com.feed_grabber.core.team;

import com.feed_grabber.core.auth.exceptions.JwtTokenException;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.WrongCompanyNameException;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.search.SearchRepository;
import com.feed_grabber.core.search.dto.PagedResponseDto;
import com.feed_grabber.core.team.dto.*;
import com.feed_grabber.core.team.exceptions.TeamExistsException;
import com.feed_grabber.core.team.exceptions.TeamNotFoundException;
import com.feed_grabber.core.team.exceptions.TeamUserLeadNotFoundException;
import com.feed_grabber.core.team.exceptions.WrongTeamNameException;
import com.feed_grabber.core.team.model.Team;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final SearchRepository searchRepository;

    public TeamService(TeamRepository teamRepository, UserRepository userRepository, SearchRepository searchRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.searchRepository = searchRepository;
    }

    public List<TeamShortDto> getAllByCompany_Id(UUID companyId, Integer page, Integer size) {
        return teamRepository.findAllByCompanyId(companyId, PageRequest.of(page, size));
    }

    public Long countAllByCompanyId(UUID companyID){
        return teamRepository.countAllByCompanyId(companyID);
    }

    public PagedResponseDto<TeamShortDto> searchByQuery(String query, Integer page, Integer size){
        return searchRepository.getTeamList(query, Optional.of(page), Optional.of(size));
    }

    public TeamDetailsDto getOne(UUID companyId, UUID id, UUID userId, String role) throws TeamNotFoundException {
        var team = teamRepository.findOneByCompanyIdAndId(companyId, id)
                .orElseThrow(TeamNotFoundException::new);

        if (role.equals("employee")) {
            if(team.getLead() == null || !team.getLead().getId().equals(userId)) {
                throw new JwtTokenException("No permissions to see page");
            }
        }

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

        if (teamDto.getName().length() > 40) {
            throw new WrongTeamNameException("Too long team name(more than 40)");
        }
        if (!teamDto.getName()
                .matches("([a-zA-Z0-9!#$%&'*+\\-\\/=?^_`]+)[ ]?([a-zA-Z0-9!#$%&'*+\\-\\/=?^_`]+)")) {
            throw new WrongTeamNameException("Team name should not start/end with space," +
                    " have more than one space in sequence. " +
                    "Team name can contain latin letters, numbers and special symbols.");
        }

        Team team = TeamMapper.MAPPER.teamDtoToModel(teamDto);
        team = teamRepository.save(team);

        return new TeamDetailsDto(team.getId(), team.getName(), null, Collections.emptyList());
    }

    public void delete(UUID id, UUID companyId) {
        teamRepository.deleteByIdAndCompanyId(id, companyId);
    }
}
