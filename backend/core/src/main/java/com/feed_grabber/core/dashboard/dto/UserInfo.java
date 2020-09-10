package com.feed_grabber.core.dashboard.dto;

import com.feed_grabber.core.request.dto.RequestDashboardDto;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.user.dto.UserShortDto;
import com.feed_grabber.core.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserInfo {
    UUID id;
    String username;
    String firstName;
    String lastName;
    String role;
    Boolean isTeamLead;
    List<RequestDashboardDto> reports;

    public UserInfo(UUID id, String username, String firstName, String lastName, String role, Boolean isTeamLead) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.isTeamLead = isTeamLead;
    }
}
