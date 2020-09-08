package com.feed_grabber.core.request.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestDashboardDto {
    UUID id;
    String title;
    String closeDate;
}
