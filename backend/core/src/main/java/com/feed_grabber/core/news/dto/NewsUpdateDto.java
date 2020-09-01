package com.feed_grabber.core.news.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class NewsUpdateDto {
    private UUID id;
    private String title;
    private String type;
    private String body;
    private UUID imageId;
}
