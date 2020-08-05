package com.feed_grabber.core.auth.dto;

import lombok.*;

@Data
@NoArgsConstructor
public class TokenRefreshRequestDTO {
    String token;
}
