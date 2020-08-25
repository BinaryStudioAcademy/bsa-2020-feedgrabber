package com.feed_grabber.core.notification;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserNotificationMapper {
    UserNotificationMapper MAPPER = Mappers.getMapper(UserNotificationMapper.class);

}
