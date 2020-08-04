package com.feed_grabber.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
public class UserCreateDto {
    private final UUID id;
    private final String username;
    private final String email;
    private final String password;
    private final UUID roleId;
    private final UUID teamId;
}

