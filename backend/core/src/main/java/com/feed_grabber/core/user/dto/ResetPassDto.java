package com.feed_grabber.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class ResetPassDto {
    String token;
    String password;
}

