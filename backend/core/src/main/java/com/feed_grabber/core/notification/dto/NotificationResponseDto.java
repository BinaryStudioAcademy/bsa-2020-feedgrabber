package com.feed_grabber.core.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponseDto {
    private UUID id;
    private String text;
    private Date date;
    private UUID requestId;
    private UUID questionnaireId;
    private Boolean isRead;
}
