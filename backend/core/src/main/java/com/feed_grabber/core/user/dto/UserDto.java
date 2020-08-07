package com.feed_grabber.core.user.dto;

import com.feed_grabber.core.user.model.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.util.UUID;

@Data
@NoArgsConstructor
public class UserDto {
    private UUID id;
    private String email;
    private String username;
    private String password;
}
