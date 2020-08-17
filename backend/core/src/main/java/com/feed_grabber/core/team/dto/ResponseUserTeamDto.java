package com.feed_grabber.core.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.util.UUID;

@Data
@ToString
@AllArgsConstructor
public class ResponseUserTeamDto {
    UUID teamId;
    UUID userId;
    Boolean added;
}
