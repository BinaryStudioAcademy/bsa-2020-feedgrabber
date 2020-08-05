package com.feed_grabber.core.team;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

//TODO: edit company_id with CompanyDto and add it to builder

@Data
@NoArgsConstructor
public class TeamDto {
    private UUID id;
    private String name;
    //private final Company company_id;
}
