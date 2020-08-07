package com.feed_grabber.core.user.dto;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseOnlyNameDTO {
    private UUID id;
    private String email;
    private String username;
}
