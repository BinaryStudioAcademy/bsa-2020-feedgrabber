package com.feed_grabber.core.Auth.dto;

import lombok.Data;

@Data
public class UserRegisterDto {
    private String email;
    private String password;
    private String companyName;
}
