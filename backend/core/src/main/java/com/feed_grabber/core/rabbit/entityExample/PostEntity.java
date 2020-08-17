package com.feed_grabber.core.rabbit.entityExample;

import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
public class PostEntity implements Serializable {
    private UUID entityID;
    private EntityType type;
}
