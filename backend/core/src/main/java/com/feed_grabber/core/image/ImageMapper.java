package com.feed_grabber.core.image;

import com.feed_grabber.core.image.dto.ImageDto;
import com.feed_grabber.core.image.model.Image;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ImageMapper {
    ImageMapper MAPPER = Mappers.getMapper(ImageMapper.class);

    ImageDto imageToImageDto(Image image);
}