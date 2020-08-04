package com.feed_grabber.core.auth.dto;

import lombok.Data;

@Data
public class UserRegistrationDto {
    private String email;
    private String password;
    private String companyName;
}
