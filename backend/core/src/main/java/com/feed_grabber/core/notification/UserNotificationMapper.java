package com.feed_grabber.core.notification;

import com.feed_grabber.core.notification.dto.NotificationResponseDto;
import com.feed_grabber.core.notification.model.UserNotification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserNotificationMapper {
    UserNotificationMapper MAPPER = Mappers.getMapper(UserNotificationMapper.class);

//    @Mapping(target = "date", source = "userNotification.request.creationDate")
//    @Mapping(target = "requestId", source = "userNotification.request.id")
    NotificationResponseDto notificationResponseDtoFromModel(UserNotification userNotification);
}
