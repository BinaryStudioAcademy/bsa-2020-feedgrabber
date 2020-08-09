package com.feed_grabber.core.question;

import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QuestionMapper {
    QuestionMapper MAPPER = Mappers.getMapper(QuestionMapper.class);

    @Mapping(source = "questionnaire.title", target = "questionnaireTitle")
    @Mapping(source = "category.title", target = "categoryTitle")
    QuestionDto questionToQuestionDto(Question question);
}
