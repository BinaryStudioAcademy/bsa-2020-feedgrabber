package com.feed_grabber.core.invitation.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class InvitationSignUpDto {
    private String email;
    private String companyName;
    private Date createdAt;
    private Boolean expired;
    private Boolean accepted;
}
