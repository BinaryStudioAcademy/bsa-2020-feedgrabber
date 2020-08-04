package com.feed_grabber.core.user.dto;

import com.feed_grabber.core.role.RoleDto;
import com.feed_grabber.core.team.TeamDto;
import com.feed_grabber.core.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Data
@Builder
public class UserDto {
    private final UUID id;
    private final String email;
    private final String username;
    private final String password;

    public static UserDto fromEntity(User user) {
        return UserDto
                .builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .password(user.getPassword())
                .build();
    }
}
