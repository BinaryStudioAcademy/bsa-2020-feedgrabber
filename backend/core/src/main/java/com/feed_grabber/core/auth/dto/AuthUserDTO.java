package com.feed_grabber.core.auth.dto;

import com.feed_grabber.core.user.dto.UserResponseOnlyNameDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthUserDTO {
    private String accessToken;
    private String refreshToken;
    private UserResponseOnlyNameDTO user;
}
