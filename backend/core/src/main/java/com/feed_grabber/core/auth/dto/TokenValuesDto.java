package com.feed_grabber.core.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TokenValuesDto {
    UUID userId;
    UUID companyId;
    String role;
}
