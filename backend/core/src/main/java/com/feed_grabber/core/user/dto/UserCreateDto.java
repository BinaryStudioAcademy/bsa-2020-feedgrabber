package com.feed_grabber.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.util.Set;
import java.util.UUID;

@Value
@AllArgsConstructor
public class UserCreateDto {
    UUID id;
    String username;
    String email;
    String password;
}

