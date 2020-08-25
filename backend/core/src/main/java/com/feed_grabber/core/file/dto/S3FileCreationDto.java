package com.feed_grabber.core.file.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class S3FileCreationDto {
    UUID requestId;
    String link;
    String key;
}
