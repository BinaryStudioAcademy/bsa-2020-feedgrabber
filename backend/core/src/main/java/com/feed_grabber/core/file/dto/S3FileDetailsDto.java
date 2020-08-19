package com.feed_grabber.core.file.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class S3FileDetailsDto {
    UUID id;
    String link;
}
