package com.feed_grabber.core.image;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.image.dto.ImageDto;
import com.feed_grabber.core.image.dto.ImageUploadDto;
import com.feed_grabber.core.image.exceptions.BadCropParamsException;
import com.feed_grabber.core.image.exceptions.BadImageException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    private ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @ApiOperation(value = "Upload new image to imgur and save link to database",
            notes = "Provide image file an optionally x, y, wifth and height if you want to crop image")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ImageDto upload(
            @RequestParam("image")
            @ApiParam(value = "Image to upload", required = true)
                    MultipartFile file,
            @RequestParam(value = "x", required = false, defaultValue = "0")
            @ApiParam(value = "Crop X start coordinate", required = false)
                    Integer x,
            @RequestParam(value = "y", required = false, defaultValue = "0")
            @ApiParam(value = "Crop Y start coordinate", required = false)
                    Integer y,
            @RequestParam(value = "width", required = false)
            @ApiParam(value = "Crop width", required = false)
                    Integer width,
            @RequestParam(value = "height", required = false)
            @ApiParam(value = "Crop height", required = false)
                    Integer height
    ) throws BadImageException, BadCropParamsException {
        return imageService.upload(new ImageUploadDto(file, x, y, width, height));
    }

    @ApiOperation(value = "Delete image from imgur and link its link from database",
            notes = "Provide Id of image link to delete")
    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@RequestParam @ApiParam(value = "Id of image link to delete", required = true) UUID id) throws NotFoundException {
        imageService.delete(id);
    }
}
