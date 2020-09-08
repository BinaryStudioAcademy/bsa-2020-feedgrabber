package com.feed_grabber.core.news.dto;

import com.feed_grabber.core.image.dto.ImageDto;
import com.feed_grabber.core.newsReaction.dto.ReactionDto;
import com.feed_grabber.core.user.dto.UserShortDto;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
public class NewsDto {
    private UUID id;
    private String title;
    private String type;
    private String body;
    private ImageDto image;
    private UserShortDto user;
    private Date createdAt;
    private List<ReactionDto> reactions;
}
