package com.feed_grabber.core.fileStorage;

import com.feed_grabber.core.file.dto.S3FileDetailsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/fs")
public class FSController {

    private AmazonService amazonService;

    @Autowired
    public FSController(AmazonService amazonService) {
        this.amazonService = amazonService;
    }

    @PostMapping("/upload/question/file")
    public S3FileDetailsDto uploadFile(@RequestPart(value = "file") MultipartFile file, @RequestParam UUID questionId) throws IOException {
        return this.amazonService.uploadQuestionFile(file, questionId);
    }

}
