package com.feed_grabber.core.news.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class NewsCreateDto {
    private String body;
    private UUID imageId;
    private UUID userId;
    private UUID companyId;
}
