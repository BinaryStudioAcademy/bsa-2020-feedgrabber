package com.feed_grabber.core.dashboard.dto;

import com.feed_grabber.core.user.dto.UserShortDto;

import java.util.List;
import java.util.UUID;

public class TeamDashboardDto {
    private UUID id;
    private String name;
    private UserShortDto teamLead;
    private List<UserShortDto> members;
}
