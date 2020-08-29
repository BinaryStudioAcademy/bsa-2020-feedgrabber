package com.feed_grabber.core.sections;

import com.feed_grabber.core.question.QuestionMapper;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionnaire.QuestionnaireMapper;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.sections.dto.SectionCreateDto;
import com.feed_grabber.core.sections.dto.SectionDto;
import com.feed_grabber.core.sections.dto.SectionQuestionsDto;
import com.feed_grabber.core.sections.model.Section;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses ={QuestionMapper.class, QuestionnaireMapper.class})
public interface SectionMapper {
    SectionMapper MAPPER = Mappers.getMapper(SectionMapper.class);

    @Mapping(target = "questionnaire", source = "questionnaire")
    @Mapping(target = "title", source = "dto.title")
    @Mapping(target = "questions", ignore = true)
    Section createDtoToModel(SectionCreateDto dto, Questionnaire questionnaire);

    SectionDto modelToDto(Section section);

    @Mapping(target = "questions", source = "questions")
    SectionQuestionsDto sectionAndQuestionsDto(Section section, List<Question> questions);
}
