package com.feed_grabber.core.team;

import com.feed_grabber.core.company.CompanyMapper;
import com.feed_grabber.core.team.dto.TeamDto;
import com.feed_grabber.core.team.dto.RequestTeamDto;
import com.feed_grabber.core.team.dto.TeamShortDto;
import com.feed_grabber.core.team.model.Team;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {CompanyMapper.class})
public interface TeamMapper {
    TeamMapper MAPPER = Mappers.getMapper(TeamMapper.class);

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "users", ignore = true)
    @Mapping(target = "lead", ignore = true)
    Team teamDtoToModel(RequestTeamDto teamDto);

    @Mapping(source = "users", target = "members")
    TeamDto teamToTeamDto(Team team);

    @Mapping(target = "membersAmount", expression = "java(team.getUsers().size())")
    @Mapping(target = "leadId", source = "lead.id")
    TeamShortDto teamToTeamShort(Team team);
}
