package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.dto.UserLoginDTO;
import com.feed_grabber.core.user.dto.UserCreateDto;
import com.feed_grabber.core.user.dto.UserDto;
import com.feed_grabber.core.user.dto.UserResponseOnlyNameDTO;
import com.feed_grabber.core.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Mapper
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    UserDto userToUserDto(User user);

    @Mapping(target = "teams", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "userProfile", ignore = true)
    @Mapping(target = "userSettings", ignore = true)
    User userCreateDtoToModel(UserCreateDto userDto);

    UserResponseOnlyNameDTO responseFromUser(User user);

    @Mapping(target = "principal", source = "username")
    @Mapping(target = "credentials", source = "password")
    UsernamePasswordAuthenticationToken authFromUserLoginDto(UserLoginDTO user);
}
