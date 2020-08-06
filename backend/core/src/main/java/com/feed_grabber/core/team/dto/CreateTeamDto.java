package com.feed_grabber.core.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.util.UUID;

@Data
@Value
@AllArgsConstructor
public class CreateTeamDto {
    UUID id;
    String name;
    UUID company_id;
}
