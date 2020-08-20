package com.feed_grabber.core.image.dto;

import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.web.multipart.MultipartFile;

@Value
@AllArgsConstructor
public class ImageUploadDto {
    private MultipartFile file;
    private Integer x;
    private Integer y;
    private Integer width;
    private Integer height;
}
