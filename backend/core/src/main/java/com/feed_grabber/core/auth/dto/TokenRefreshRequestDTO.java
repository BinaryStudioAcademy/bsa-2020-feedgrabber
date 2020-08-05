package com.feed_grabber.core.auth.dto;

import lombok.Value;

@Value
public class TokenRefreshRequestDTO {
    String token;
}
