package com.feed_grabber.core.team;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.dto.CompanyDto;
import com.feed_grabber.core.team.dto.CreateTeamDto;
import com.feed_grabber.core.team.dto.TeamDto;
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

    public List<TeamDto> getAll() {
        return teamRepository
                .findAll()
                .stream()
                .map(TeamMapper.MAPPER::teamToTeamDto)
                .collect(Collectors.toList());
    }

    public Optional<TeamDto> getById(UUID id) {
        return teamRepository.findById(id)
                .map(TeamMapper.MAPPER::teamToTeamDto);
    }

    public Optional<TeamDto> update(CreateTeamDto teamDto) {
        return teamRepository.findById(teamDto.getId())
                .map(team -> {
                    team.setName(teamDto.getName());
                    teamRepository.save(team);
                    return team;
                })
                .map(TeamMapper.MAPPER::teamToTeamDto);
    }

    public void delete(UUID id) {
        teamRepository.deleteById(id);
    }
}
