package com.feed_grabber.core.newsReaction.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ReactionCreationDto {
    private String reaction;
    private UUID newsId;
}
