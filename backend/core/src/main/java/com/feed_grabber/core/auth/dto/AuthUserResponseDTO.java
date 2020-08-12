package com.feed_grabber.core.auth.dto;

import com.feed_grabber.core.user.dto.UserResponseAuthDetailsDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthUserResponseDTO {
    private String accessToken;
    private String refreshToken;
    private UserResponseAuthDetailsDTO user;
}
