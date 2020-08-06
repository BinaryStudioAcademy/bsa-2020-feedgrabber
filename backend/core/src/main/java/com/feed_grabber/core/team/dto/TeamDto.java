package com.feed_grabber.core.team.dto;

import com.feed_grabber.core.company.dto.CompanyDto;
import com.feed_grabber.core.team.model.Team;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.util.UUID;

@Data
@NoArgsConstructor
public class TeamDto {
    private UUID id;
    private String name;
    private CompanyDto companyDto;
}
