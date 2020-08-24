package com.feed_grabber.core.invitation.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class InvitationGenerateRequestDto {
    private String email;
    private UUID companyId;
}
