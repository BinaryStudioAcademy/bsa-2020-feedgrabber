package com.feed_grabber.core.newsReaction.dto;

import com.feed_grabber.core.user.dto.UserShortDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.util.UUID;

@Value
@AllArgsConstructor
public class ReactionCreationResponseDto {
    private UUID newsId;
    private String reaction;
    private UserShortDto user;
    private Boolean toAdd;
}
