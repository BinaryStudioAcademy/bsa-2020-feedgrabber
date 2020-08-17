package com.feed_grabber.core.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class UserLoginDTO {
    private String password;
    private String username;
    private UUID companyId;
}
