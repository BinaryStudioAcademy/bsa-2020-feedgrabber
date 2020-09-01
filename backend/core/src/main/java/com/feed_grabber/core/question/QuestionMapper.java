package com.feed_grabber.core.question;

import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.dto.QuestionUpsertDto;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public abstract class QuestionMapper {
    public static QuestionMapper MAPPER = Mappers.getMapper(QuestionMapper.class);

    @Mapping(source = "category.title", target = "categoryTitle")
    @Mapping(source = "text", target = "name")
    @Mapping(source = "payload", target = "details")
    @Mapping(target = "index", ignore = true)
    public abstract QuestionDto questionToQuestionDto(Question question);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "category", target = "category")
    @Mapping(source = "createDto.name", target = "text")
    @Mapping(target = "questionnaires", ignore = true)
    @Mapping(target = "company", source = "questionnaire.company")
    @Mapping(target = "payload", source = "createDto.details")
    public abstract Question questionCreateDtoToModel(
            QuestionCreateDto createDto,
            Questionnaire questionnaire,
            QuestionCategory category
    );

    @Mapping(target = "questionnaireId", ignore = true)
    @Mapping(target = "sectionId", ignore = true)
    public abstract QuestionCreateDto upsertDtoToCreateDto(QuestionUpsertDto dto);

    public abstract QuestionUpdateDto upsertDtoToUpdateDto(QuestionUpsertDto dto);
}
