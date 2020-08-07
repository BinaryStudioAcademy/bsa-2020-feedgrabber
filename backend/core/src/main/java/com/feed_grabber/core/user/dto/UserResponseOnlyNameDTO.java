package com.feed_grabber.core.user.dto;

import lombok.*;

import java.util.UUID;

@Value
@AllArgsConstructor
public class UserResponseOnlyNameDTO {
    UUID id;
    String email;
    String username;
}
