package com.feed_grabber.core.team;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.team.dto.CreateTeamDto;
import com.feed_grabber.core.team.dto.TeamDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.feed_grabber.core.team.model.Team;
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

    public List<TeamDto> getAllByCompany_Id(UUID companyId) {

        return teamRepository
                .findAllByCompanyId(companyId)
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

    public void create() {
        teamRepository.save(new Team("masdasd",new Company(UUID.fromString("afa14521-b8db-44a7-b9b7-98bd8244cc19"))));
    }
}
