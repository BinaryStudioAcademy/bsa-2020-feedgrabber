package com.feed_grabber.core.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class TokenRefreshResponseDTO {
    String accessToken;
    String refreshToken;
}
