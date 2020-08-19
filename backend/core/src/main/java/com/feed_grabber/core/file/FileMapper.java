package com.feed_grabber.core.file;

import com.feed_grabber.core.file.dto.S3FileDetailsDto;
import com.feed_grabber.core.file.model.S3File;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FileMapper {
    FileMapper MAPPER = Mappers.getMapper(FileMapper.class);

    S3FileDetailsDto imageToImageDto(S3File image);
}
