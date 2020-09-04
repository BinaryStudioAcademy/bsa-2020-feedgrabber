package com.feed_grabber.core.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class UserShortDto {
    private UUID id;
    private String username;
    private String firstName;
    private String lastName;
    private String avatar;
}
