package com.feed_grabber.core.image;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.image.dto.ImageDto;
import com.feed_grabber.core.image.dto.ImageUploadDto;
import com.feed_grabber.core.image.dto.ImgurResponse;
import com.feed_grabber.core.image.exceptions.BadCropParamsException;
import com.feed_grabber.core.image.exceptions.BadImageException;
import com.feed_grabber.core.image.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.image.RasterFormatException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class ImageService {

    @Value(value = "${imgur.id}")
    private String IMGUR_ID;

    private static final String IMGUR_URL = "https://api.imgur.com/3/image";
    @Autowired
    ImageRepository imageRepository;

    public ImageDto upload(ImageUploadDto fileDto) throws BadImageException, BadCropParamsException {
        try {
            byte[] bytes;

            if (fileDto.getWidth() != null && fileDto.getHeight() != null) {
                bytes = cropImage(fileDto);
            } else {
                bytes = fileDto.getFile().getBytes();
            }
            var result = this.uploadToImgur(bytes);

            var image = new Image();
            image.setLink(result.getData().getLink());
            image.setDeleteHash(result.getData().getDeletehash());

            var imageEntity = imageRepository.save(image);

            return ImageMapper.MAPPER.imageToImageDto(imageEntity);
        } catch (IOException e) {
            throw new BadImageException("Cannot read your image");
        } catch (RasterFormatException e) {
            throw new BadCropParamsException("You entered wrong params for crop: " + e.getMessage());
        }
    }

    private ImgurResponse uploadToImgur(byte[] bytes) throws JsonProcessingException {
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.add("Authorization", "Client-ID " + IMGUR_ID);

        var body = new LinkedMultiValueMap<>();
        body.add("image", bytes);

        var requestEntity = new HttpEntity<>(body, headers);

        var restTemplate = new RestTemplate();
        var response = restTemplate.postForEntity(IMGUR_URL, requestEntity, String.class);
        var json = response.getBody();
        var mapper = new ObjectMapper();

        return mapper.readValue(json, ImgurResponse.class);
    }

    private byte[] cropImage(ImageUploadDto imageDto) throws IOException {
        BufferedImage image = ImageIO
                .read(imageDto.getFile().getInputStream())
                .getSubimage(imageDto.getX(), imageDto.getY(), imageDto.getWidth(), imageDto.getHeight());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(image, "png", outputStream);
        return outputStream.toByteArray();
    }

    public void delete(UUID id) throws NotFoundException {
        var image = imageRepository.findById(id).orElseThrow(NotFoundException::new);
        deleteFromImgur(image.getDeleteHash());
        imageRepository.deleteById(id);
    }

    private void deleteFromImgur(String deleteHash){
        var headers = new HttpHeaders();
        headers.add("Authorization", "Client-ID " + IMGUR_ID);

        var requestEntity = new HttpEntity<>(headers);

        var restTemplate = new RestTemplate();
        restTemplate.delete(IMGUR_URL+"/"+deleteHash, requestEntity);
    }
}
