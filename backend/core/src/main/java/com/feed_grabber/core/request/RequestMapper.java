package com.feed_grabber.core.request;

import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.request.dto.CreateRequestDto;
import com.feed_grabber.core.request.dto.RequestQuestionnaireDto;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Mapper
public interface RequestMapper {
    RequestMapper MAPPER = Mappers.getMapper(RequestMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "creationDate", ignore = true)
    Request requestCreationRequestDtoToModel(CreateRequestDto dto,
                                             Questionnaire questionnaire,
                                             User targetUser,
                                             User requestMaker,
                                             LocalTime expirationDate);

    @Mapping(target = "requestId", source = "request.id")
    RequestQuestionnaireDto requestAndQuestionnaireToDto(Request request, Questionnaire questionnaire);
}
