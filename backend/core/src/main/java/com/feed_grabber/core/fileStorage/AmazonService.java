package com.feed_grabber.core.fileStorage;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.file.FileMapper;
import com.feed_grabber.core.file.FileRepository;
import com.feed_grabber.core.file.dto.S3FileDetailsDto;
import com.feed_grabber.core.fileStorage.exceptions.BadFileException;
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

    private final AmazonS3Client s3client;
    private final FileRepository fIleRepository;

    @Autowired
    public AmazonService(AmazonS3Client s3client, FileRepository fileRepository) {
        this.s3client = s3client;
        this.fIleRepository = fileRepository;
    }

    public S3FileDetailsDto uploadResponseFile(MultipartFile multipartFile) throws BadFileException {
        return uploadFile(multipartFile, QUESTION_FILES_PATH);
    }

    private S3FileDetailsDto uploadFile(MultipartFile multipartFile, String filePathPrefix) throws BadFileException {
        try {
            var file = convertMultiPartToFile(multipartFile);
            var fileName = filePathPrefix + generateFileName(multipartFile);
            var fileUrl = ENDPOINT_URL + BUCKET_NAME + "/" + fileName;

            uploadFileTos3bucket(fileName, file);

            var savedFile = fIleRepository.save(S3File.builder().link(fileUrl).build());
            file.delete();
            return FileMapper.MAPPER.imageToImageDto(savedFile);
        } catch (IOException e) {
            throw new BadFileException("Can not read file");
        }
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        String name = file.getOriginalFilename() != null ? file.getOriginalFilename() : UUID.randomUUID() + "-file";
        var resFile = new File(name);
        FileOutputStream fos = new FileOutputStream(resFile);
        fos.write(file.getBytes());
        fos.close();
        return resFile;
    }

    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
    }

    private void uploadFileTos3bucket(String fileName, File file) {
        s3client.putObject(new PutObjectRequest(BUCKET_NAME, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }

    public void deleteFile(UUID fileId) throws NotFoundException {
        var s3File = fIleRepository.findById(fileId).orElseThrow(NotFoundException::new);
        var fileName = s3File.getLink().substring(s3File.getLink().lastIndexOf(BUCKET_NAME)+BUCKET_NAME.length()+1);
        s3client.deleteObject(new DeleteObjectRequest(BUCKET_NAME, fileName));
        fIleRepository.deleteById(fileId);
    }
}
