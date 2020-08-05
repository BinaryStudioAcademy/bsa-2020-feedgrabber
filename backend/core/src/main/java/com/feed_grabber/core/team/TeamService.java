package com.feed_grabber.core.team;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.dto.CompanyDto;
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
                .map(TeamDto::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<TeamDto> getById(UUID id) {
        return teamRepository.findById(id).map(TeamDto::fromEntity);
    }

    public Optional<TeamDto> update(UUID id, TeamDto teamDto, CompanyDto companyDto) {
        var team = teamRepository.findById(id).get();
        var company = companyRepository.findById(companyDto.getId()).get();

        team.setName(teamDto.getName());
        team.setCompany(company);
        teamRepository.save(team);
        return Optional.of(TeamDto.fromEntity(team));
    }

    public void delete(UUID id) {
        teamRepository.deleteById(id);
    }
}
