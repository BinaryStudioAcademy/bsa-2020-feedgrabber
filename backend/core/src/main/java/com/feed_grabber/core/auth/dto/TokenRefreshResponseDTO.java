package com.feed_grabber.core.auth.dto;

import lombok.*;

@Value
@AllArgsConstructor
public class TokenRefreshResponseDTO {
    String accessToken;
    String refreshToken;
}
