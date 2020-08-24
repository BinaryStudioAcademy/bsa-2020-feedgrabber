package com.feed_grabber.core.response;

import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.response.dto.ResponseCreateDto;
import com.feed_grabber.core.response.dto.ResponseDetailsDto;
import com.feed_grabber.core.response.dto.ResponseDto;
import com.feed_grabber.core.response.dto.UserResponseShortDto;
import com.feed_grabber.core.response.model.Response;
import com.feed_grabber.core.user.UserMapper;
import com.feed_grabber.core.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {UserMapper.class})
public interface ResponseMapper {
    ResponseMapper MAPPER = Mappers.getMapper(ResponseMapper.class);

    @Mapping(target = "id", ignore = true)
    Response responseFromDto(ResponseCreateDto dto, User user, Request request);

    @Mapping(target = "requestId", source = "request.id")
    @Mapping(target = "userId", source = "user.id")
    ResponseDto responseToDto(Response response);

    ResponseDetailsDto responseToResponseDetailsDto(Response response);
}
