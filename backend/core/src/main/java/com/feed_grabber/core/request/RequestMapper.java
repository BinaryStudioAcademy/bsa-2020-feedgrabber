package com.feed_grabber.core.request;

import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.request.dto.RequestCreationRequestDto;
import com.feed_grabber.core.request.dto.RequestQuestionnaireDto;
import com.feed_grabber.core.request.model.Request;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RequestMapper {
    RequestMapper MAPPER = Mappers.getMapper(RequestMapper.class);

    Request requestCreationRequestDtoToModel(RequestCreationRequestDto dto);

    @Mapping(target = "requestId", source = "request.id")
    @Mapping(target = "questionnaire", source = "questionnaire")
    RequestQuestionnaireDto requestAndQuestionnaireToDto(Request request, Questionnaire questionnaire);
}
