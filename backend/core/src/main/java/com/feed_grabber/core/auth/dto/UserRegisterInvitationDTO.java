package com.feed_grabber.core.auth.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserRegisterInvitationDTO {
    private String email;
    private String password;
    private String username;
    private UUID invitationId;
}
