package com.feed_grabber.core.rabbit.entityExample;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@AllArgsConstructor
@Data
public class PostEntity implements Serializable {
    private UUID entityID;
    private MailType type;
}
