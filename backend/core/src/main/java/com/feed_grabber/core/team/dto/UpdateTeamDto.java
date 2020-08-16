package com.feed_grabber.core.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.util.List;
import java.util.UUID;

@Data
@ToString
@AllArgsConstructor
public class UpdateTeamDto {
    UUID id;
    String name;
    UUID companyId;
}
