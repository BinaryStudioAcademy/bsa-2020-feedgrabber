package com.feed_grabber.core.rabbit.entityExample;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class MailEntity {
    private MailType type;
    private String message;
    private String emailTo;
}
