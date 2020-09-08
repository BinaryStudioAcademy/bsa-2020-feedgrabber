package com.feed_grabber.core.rabbit.entityExample;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@Data
public class CloseRequest {
    private UUID requestId;
    private Date closeDate;
}
