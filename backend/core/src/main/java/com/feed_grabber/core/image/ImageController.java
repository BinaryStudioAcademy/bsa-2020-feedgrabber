package com.feed_grabber.core.image;

import com.feed_grabber.core.image.dto.ImageDto;
import com.feed_grabber.core.image.dto.ImageUploadDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    private ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ImageDto upload(
            @RequestParam("image") MultipartFile file,
            @RequestParam(value = "x", required = false, defaultValue = "0") Integer x,
            @RequestParam(value = "y", required = false, defaultValue = "0") Integer y,
            @RequestParam(value = "width", required = false) Integer width,
            @RequestParam(value = "height", required = false) Integer height
    ) throws IOException {
        return imageService.upload(new ImageUploadDto(file, x, y, width, height));
    }

}
