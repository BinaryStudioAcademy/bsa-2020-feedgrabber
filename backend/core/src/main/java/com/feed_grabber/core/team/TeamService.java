package com.feed_grabber.core.team;

import com.feed_grabber.core.auth.exceptions.JwtTokenException;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.team.dto.*;
import com.feed_grabber.core.team.exceptions.TeamExistsException;
import com.feed_grabber.core.team.exceptions.TeamNotFoundException;
import com.feed_grabber.core.team.model.Team;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void delete(UUID id) {
        teamRepository.deleteById(id);
    }

    public TeamDto create(CreateTeamDto teamDto) throws CompanyNotFoundException, AlreadyExistsException {

        if (teamRepository.existsByName(teamDto.getName())) {
            throw new AlreadyExistsException("Such team already exists in this company");
        }

        Team t = TeamMapper.MAPPER.teamDtoToModel(teamDto);
        var company = companyRepository.findById(teamDto.getCompany_id())
                .orElseThrow(CompanyNotFoundException::new);
        var users = userRepository.findAllById(teamDto.getMemberIds());

        t.setCompany(company);
        t.setUsers(users);

        Team savedTeam = teamRepository.save(t);

        return TeamMapper.MAPPER.teamToTeamDto(savedTeam);
    }
}
