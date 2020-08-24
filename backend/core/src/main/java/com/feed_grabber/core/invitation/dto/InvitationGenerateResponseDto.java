package com.feed_grabber.core.invitation.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
public class InvitationGenerateResponseDto {
    private String email;
    private Date createdAt;
}
