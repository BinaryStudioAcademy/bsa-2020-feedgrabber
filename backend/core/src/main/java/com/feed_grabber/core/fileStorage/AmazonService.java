package com.feed_grabber.core.fileStorage;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.feed_grabber.core.file.FileMapper;
import com.feed_grabber.core.file.FileRepository;
import com.feed_grabber.core.file.dto.S3FileDetailsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.feed_grabber.core.file.model.S3File;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.UUID;

@Service
public class AmazonService {

    @Value("${amazon.endpointUrl}")
    private String ENDPOINT_URL;
    @Value("${amazon.bucketName}")
    private String BUCKET_NAME;
    @Value("${amazon.question.files.path}")
    private String QUESTION_FILES_PATH;

    private AmazonS3Client s3client;
    private FileRepository fIleRepository;

    @Autowired
    public AmazonService(AmazonS3Client s3client, FileRepository fileRepository) {
        this.s3client = s3client;
        this.fIleRepository = fileRepository;
    }

    public S3FileDetailsDto uploadQuestionFile(MultipartFile multipartFile, UUID questionId) throws IOException {
        try {
            var file = convertMultiPartToFile(multipartFile);
            var fileName = QUESTION_FILES_PATH + questionId + "/" + generateFileName(multipartFile);
            var fileUrl = ENDPOINT_URL + BUCKET_NAME + "/" + fileName;
            uploadFileTos3bucket(fileName, file);
            var savedFile = fIleRepository.save(S3File.builder().link(fileUrl).build());
            return FileMapper.MAPPER.imageToImageDto(savedFile);
        } catch (IOException e) {
            throw e;
        }
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
    }

    private void uploadFileTos3bucket(String fileName, File file) {
        s3client.putObject(new PutObjectRequest(BUCKET_NAME, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }
}
