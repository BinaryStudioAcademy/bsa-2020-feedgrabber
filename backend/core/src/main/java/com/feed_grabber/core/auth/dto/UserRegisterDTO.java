package com.feed_grabber.core.auth.dto;

import lombok.Data;

@Data
public class UserRegisterDTO {
    private String email;
    private String password;
    private String username;
    private String companyName;
}
