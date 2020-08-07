package com.feed_grabber.core.user;

import com.feed_grabber.core.user.dto.UserCreateDto;
import com.feed_grabber.core.user.dto.UserDto;
import com.feed_grabber.core.user.dto.UserResponseDto;
import com.feed_grabber.core.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    UserDto userToUserDto(User user);

    @Mapping(target = "teams", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "userProfile", ignore = true)
    @Mapping(target = "userSettings", ignore = true)
    User userCreateDtoToModel(UserCreateDto userDto);

    UserResponseDto userToUserResponseDto(User user);
}
