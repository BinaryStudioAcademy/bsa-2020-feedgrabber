package com.feed_grabber.core.notification;

import com.feed_grabber.core.notification.dto.NotificationResponseDto;
import com.feed_grabber.core.notification.model.UserNotification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserNotificationMapper {
    UserNotificationMapper MAPPER = Mappers.getMapper(UserNotificationMapper.class);

}
