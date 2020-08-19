package com.feed_grabber.core.fileStorage;

import com.feed_grabber.core.file.dto.S3FileDetailsDto;
import com.feed_grabber.core.fileStorage.exceptions.BadFileException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/fs")
public class FSController {

    private final AmazonService amazonService;

    @Autowired
    public FSController(AmazonService amazonService) {
        this.amazonService = amazonService;
    }

    @ApiOperation(value = "Upload new response file to s3 bucket and save link to database",
            notes = "Provide file")
    @PostMapping("/response/file/upload")
    public S3FileDetailsDto uploadFile(
            @ApiParam(value = "File to upload", required = true)
            @RequestPart(value = "file") MultipartFile file
    ) throws BadFileException {
        return this.amazonService.uploadResponseFile(file);
    }

}
