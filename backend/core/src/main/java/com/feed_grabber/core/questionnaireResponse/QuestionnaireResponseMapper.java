package com.feed_grabber.core.questionnaireResponse;

import com.feed_grabber.core.questionnaireResponse.dto.QuestionnaireResponseCreateDto;
import com.feed_grabber.core.questionnaireResponse.dto.QuestionnaireResponseDto;
import com.feed_grabber.core.questionnaireResponse.model.QuestionnaireResponse;
import com.feed_grabber.core.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QuestionnaireResponseMapper {
    QuestionnaireResponseMapper MAPPER = Mappers.getMapper(QuestionnaireResponseMapper.class);

    @Mapping(source = "request", target = "request_id")
    @Mapping(source = "respondent.id", target = "respondent_id")
    QuestionnaireResponseDto questionnaireResponseToQuestionnaireResponseDto(QuestionnaireResponse response);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "respondent", target = "respondent")
    @Mapping(source = "createDto.requestId", target = "request")
    QuestionnaireResponse questionnaireResponseCreateDtoToModel(QuestionnaireResponseCreateDto createDto, User respondent);
}
