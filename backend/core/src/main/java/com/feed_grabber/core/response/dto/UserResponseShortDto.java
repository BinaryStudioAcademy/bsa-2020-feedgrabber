package com.feed_grabber.core.response.dto;

import lombok.Value;

import java.util.Date;
import java.util.UUID;

@Value
public class UserResponseShortDto {
    private UUID id;
    String username;
    String firstName;
    String lastName;
    Date answeredAt;
    // TODO private String avatar;
}
