package com.feed_grabber.core.responseAnswer;

import com.feed_grabber.core.responseAnswer.dto.ResponseAnswerDto;
import com.feed_grabber.core.responseAnswer.model.ResponseAnswer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ResponseAnswerMapper {
    ResponseAnswerMapper MAPPER = Mappers.getMapper(ResponseAnswerMapper.class);

    @Mapping(source = "response.id", target = "responseId")
    @Mapping(source = "question.id", target = "questionId")
    ResponseAnswerDto responseAnswerToResponseAnswerDto(ResponseAnswer response);

}
