package com.feed_grabber.core.news.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

@Data
public class NewsUpdateDto {
    private UUID id;
    @NotBlank
    @Size(max = 255)
    private String title;
    private String type;
    @NotBlank
    private String body;
    private UUID imageId;
}
