package com.feed_grabber.core.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamDetailsDto {
    private UUID id;
    private String name;
    private List<UUID> membersId;
}
