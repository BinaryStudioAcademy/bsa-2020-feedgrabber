package com.feed_grabber.core.auth.dto;

import lombok.Data;

@Data
public class UserLoginDto {
    private String email;
    private String password;
}
