package com.feed_grabber.core.registration.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SendVerificationEmailDto {
    private String email;
    private String url;
}
