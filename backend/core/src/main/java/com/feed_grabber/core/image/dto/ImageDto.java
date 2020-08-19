package com.feed_grabber.core.image.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class ImageDto {
    private UUID id;
    private String link;
}
