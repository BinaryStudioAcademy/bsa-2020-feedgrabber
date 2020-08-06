package com.feed_grabber.core.team.dto;

import com.feed_grabber.core.company.dto.CompanyDto;
import com.feed_grabber.core.team.model.Team;
import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class TeamDto {
    UUID id;
    String name;
    CompanyDto companyDto;

    public static TeamDto fromEntity(Team team) {
        return TeamDto
                .builder()
                .id(team.getId())
                .name(team.getName())
                .companyDto(CompanyDto.fromEntity(team.getCompany()))
                .build();
    }
}
