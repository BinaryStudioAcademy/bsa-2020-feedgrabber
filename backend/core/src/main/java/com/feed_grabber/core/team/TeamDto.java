package com.feed_grabber.core.team;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

//TODO: edit company_id with CompanyDto and add it to builder

@Data
@Builder
public class TeamDto {
    private final UUID id;
    private final String name;
    //private final Company company_id;

    public static TeamDto fromEntity(Team team) {
        return TeamDto
                .builder()
                .id(team.getId())
                .name(team.getName())
                .build();
    }
}
