package com.feed_grabber.core.image;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.image.dto.ImageDto;
import com.feed_grabber.core.image.dto.ImageUploadDto;
import com.feed_grabber.core.image.dto.ImgurResponse;
import com.feed_grabber.core.image.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;


import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class ImageService {

    @Value(value = "${imgur.id}")
    private String IMGUR_ID;
    @Autowired
    ImageRepository imageRepository;

    public ImageDto upload(ImageUploadDto fileDto) throws IOException {
        byte[] bytes;
        if (fileDto.getWidth() !=null && fileDto.getHeight() !=null) {
            bytes = cropImage(fileDto);
        } else {
            bytes = fileDto.getFile().getBytes();
        }
        var result = this.uploadFile(bytes);
        var image = new Image();
        image.setLink(result.getData().getLink());
        image.setDeleteHash(result.getData().getDeletehash());
        var imageEntity = imageRepository.save(image);
        return ImageMapper.MAPPER.imageToImageDto(imageEntity);
    }

    private ImgurResponse uploadFile(byte[] bytes) throws JsonProcessingException {
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.add("Authorization", "Client-ID " + IMGUR_ID);

        var body = new LinkedMultiValueMap<>();
        body.add("image", bytes);

        var requestEntity = new HttpEntity<>(body, headers);

        var serverUrl = "https://api.imgur.com/3/image";

        var restTemplate = new RestTemplate();
        var response = restTemplate.postForEntity(serverUrl, requestEntity, String.class);
        var json = response.getBody();
        var mapper = new ObjectMapper();
        return mapper.readValue(json, ImgurResponse.class);
    }

    public byte[] cropImage(ImageUploadDto fileDto) {
        try {
            BufferedImage image = ImageIO.read(fileDto.getFile().getInputStream()).getSubimage(fileDto.getX(), fileDto.getY(), fileDto.getWidth(), fileDto.getHeight());
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "jpg", baos);
            return baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
