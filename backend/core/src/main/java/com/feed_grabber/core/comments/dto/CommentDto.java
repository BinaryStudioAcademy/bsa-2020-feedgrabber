package com.feed_grabber.core.comments.dto;

import com.feed_grabber.core.user.dto.UserShortDto;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class CommentDto {
    private UUID id;
    private String body;
    private UserShortDto user;
    private Date createdAt;
}
