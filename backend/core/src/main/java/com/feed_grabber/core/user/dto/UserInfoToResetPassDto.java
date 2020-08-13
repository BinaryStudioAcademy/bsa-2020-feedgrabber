package com.feed_grabber.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UserInfoToResetPassDto {
    String userEmail;
    String companyId;
}

