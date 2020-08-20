package com.feed_grabber.core.response;

import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.response.dto.ResponseDto;
import com.feed_grabber.core.response.model.Response;
import com.feed_grabber.core.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ResponseMapper {
    ResponseMapper MAPPER = Mappers.getMapper(ResponseMapper.class);

    @Mapping(target = "id", ignore = true)
    Response responseFromDto(ResponseDto dto, User user, Request request);
}
