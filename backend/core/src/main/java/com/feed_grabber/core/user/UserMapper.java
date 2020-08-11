package com.feed_grabber.core.user;

import com.feed_grabber.core.company.CompanyMapper;
import com.feed_grabber.core.user.dto.UserCreateDto;
import com.feed_grabber.core.user.dto.UserDto;
import com.feed_grabber.core.user.dto.UserResponseDto;
import com.feed_grabber.core.user.dto.UserResponseAuthDetailsDTO;
import com.feed_grabber.core.user.model.User;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {CompanyMapper.class})
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    UserDto userToUserDto(User user);

    @Mapping(target = "teams", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "userProfile", ignore = true)
    @Mapping(target = "userSettings", ignore = true)
    User userCreateDtoToModel(UserCreateDto userDto);

    @Mapping(target = "role", source = "role.name")
    UserResponseAuthDetailsDTO responseFromUser(User user);

    @Mapping(target = "userName", source = "username")
    @Mapping(target = "firstName", source = "userProfile.firstName")
    @Mapping(target = "lastName", source = "userProfile.lastName")
    @Mapping(target = "phoneNumber", source = "userProfile.phoneNumber")
    UserDetailsResponseDTO detailedFromUser(User user);

}
