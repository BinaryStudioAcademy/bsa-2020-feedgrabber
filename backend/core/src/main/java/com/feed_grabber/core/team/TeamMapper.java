package com.feed_grabber.core.team;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TeamMapper {
    TeamMapper MAPPER = Mappers.getMapper(TeamMapper.class);

    @Mapping(target = "company", ignore = true)
    Team teamDtoToModel(TeamDto teamDto);

    TeamDto teamToTeamDto(Team team);
}
