package com.feed_grabber.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.util.UUID;

@Data
@Value
@AllArgsConstructor
public class UserCreateDto {
    UUID id;
    String username;
    String email;
    String password;
}

