package com.feed_grabber.core.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserLoginDTO {
    private String password;
    private String username;
}
