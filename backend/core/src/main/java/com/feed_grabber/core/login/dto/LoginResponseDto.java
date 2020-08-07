package com.feed_grabber.core.login.dto;

import com.feed_grabber.core.login.model.TemporaryUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginResponseDto {
    private TemporaryUser user;
    private String token;
    private String refreshedToken;
}
