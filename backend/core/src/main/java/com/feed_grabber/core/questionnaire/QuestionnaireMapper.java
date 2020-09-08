package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.question.QuestionMapper;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDetailsDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.sections.SectionMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {QuestionMapper.class, SectionMapper.class})
public interface QuestionnaireMapper {
    QuestionnaireMapper MAPPER = Mappers.getMapper(QuestionnaireMapper.class);

    @Mapping(source = "company.name", target = "companyName")
    QuestionnaireDto questionnaireToQuestionnaireDto(Questionnaire questionnaire);

    @Mapping(source = "company.name", target = "companyName")
    QuestionnaireDetailsDto questionnaireToQuestionnaireDetailsDto(Questionnaire questionnaire);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "company", target = "company")
    @Mapping(source = "createDto.title", target = "title")
    @Mapping(target = "sections", ignore = true)
    @Mapping(target = "requests", ignore = true)
    @Mapping(target = "editingEnabled", ignore = true)
    Questionnaire questionnaireCreateDtoToModel(QuestionnaireCreateDto createDto, Company company);
}
