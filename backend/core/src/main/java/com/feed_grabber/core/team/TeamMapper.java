package com.feed_grabber.core.team;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.company.CompanyMapper;
import com.feed_grabber.core.team.dto.CreateTeamDto;
import com.feed_grabber.core.team.dto.TeamDto;
import com.feed_grabber.core.team.dto.UpdateTeamDto;
import com.feed_grabber.core.team.model.Team;
import com.feed_grabber.core.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = {CompanyMapper.class})
public interface TeamMapper {
    TeamMapper MAPPER = Mappers.getMapper(TeamMapper.class);

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(target = "id", ignore = true)
    Team teamDtoToModel(UpdateTeamDto teamDto);

    //TODO Unmapped target property: "companyDto"

    @Mapping(source = "users", target = "members")
    TeamDto teamToTeamDto(Team team);
}
