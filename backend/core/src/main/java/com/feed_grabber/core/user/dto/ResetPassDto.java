package com.feed_grabber.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResetPassDto {
    String uniqueUrl;
    String password;
}

