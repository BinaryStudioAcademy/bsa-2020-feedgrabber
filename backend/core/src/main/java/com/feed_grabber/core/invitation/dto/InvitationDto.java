package com.feed_grabber.core.invitation.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
public class InvitationDto {
    private Boolean accepted;
    private Boolean expired;
    private String email;
    private Date createdAt;
}
