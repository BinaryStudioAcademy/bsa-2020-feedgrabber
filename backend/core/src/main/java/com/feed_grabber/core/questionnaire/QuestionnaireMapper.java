package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QuestionnaireMapper {
    QuestionnaireMapper MAPPER = Mappers.getMapper(QuestionnaireMapper.class);

    @Mapping(source = "company.name", target = "companyName")
    QuestionnaireDto questionnaireToQuestionnaireDto(Questionnaire questionnaire);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "company", target = "company")
    @Mapping(source = "createDto.title", target = "title")
    Questionnaire questionnaireCreateDtoToModel(QuestionnaireCreateDto createDto, Company company);
}
