package com.feed_grabber.core.comments.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CommentCreationDto {
    private UUID newsId;
    private String body;
    private UUID userId;
}
