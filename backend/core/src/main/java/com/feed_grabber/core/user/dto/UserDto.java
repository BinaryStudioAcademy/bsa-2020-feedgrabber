package com.feed_grabber.core.user.dto;

import com.feed_grabber.core.role.RoleDto;
import com.feed_grabber.core.team.TeamDto;
import com.feed_grabber.core.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
public class UserDto {
    private final UUID id;
    private final String email;
    private final String username;
    private final String password;
    private final RoleDto role;
    private final TeamDto team;

    public static UserDto fromEntity(User user) {
        return UserDto
                .builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .password(user.getPassword())
                .role(RoleDto.fromEntity(user.getRole()))
                .team(TeamDto.fromEntity(user.getTeam()))
                .build();
    }
}
