package com.feed_grabber.core.user;

import com.feed_grabber.core.company.CompanyMapper;
import com.feed_grabber.core.user.dto.*;
import com.feed_grabber.core.user.model.User;
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
    @Mapping(target = "isEnabled", ignore = true)
    @Mapping(target = "company", ignore = true)
    @Mapping(target = "isDeleted", ignore = true)
    User userCreateDtoToModel(UserCreateDto userDto);

    @Mapping(target = "role", expression = "java(user.getRole().getSystemRole().toString())")
    UserResponseAuthDetailsDTO responseFromUser(User user);

    @Mapping(target = "role", expression = "java(user.getRole().getSystemRole().toString())")
    UserDetailsReportDTO reportDetailsFromUser(User user);

    @Mapping(target = "userName", source = "username")
    @Mapping(target = "firstName", source = "userProfile.firstName")
    @Mapping(target = "lastName", source = "userProfile.lastName")
    @Mapping(target = "phoneNumber", source = "userProfile.phoneNumber")
    @Mapping(target = "avatar", source = "userProfile.avatar.link")
    @Mapping(target = "role", expression = "java(user.getRole().getSystemRole().toString())")
    @Mapping(target = "roleId", source = "role.id")
    UserDetailsResponseDTO detailedFromUser(User user);

    @Mapping(target = "firstName", source = "userProfile.firstName")
    @Mapping(target = "lastName", source = "userProfile.lastName")
    @Mapping(target = "avatar", source = "userProfile.avatar.link")
    UserShortDto shortFromUser(User user);

    @Mapping(target = "language", source = "userSettings.language", defaultValue = "English")
    @Mapping(target = "enableNotifications", source = "userSettings.enableNotifications", defaultValue = "true")
    UserSettingsDto settingsFromUser(User user);
}
