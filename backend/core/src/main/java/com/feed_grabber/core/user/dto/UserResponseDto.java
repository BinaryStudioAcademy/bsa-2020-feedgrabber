package com.feed_grabber.core.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class UserResponseDto {
    private UUID id;
    private String email;
    private String username;
}
