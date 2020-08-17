package com.feed_grabber.core.question;

import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.dto.QuestionUpsertDto;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.questionnaire2question.QuestionnaireQuestion;
import com.feed_grabber.core.questionnaire2question.QuestionnaireQuestionId;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public abstract class QuestionMapper {
    public static QuestionMapper MAPPER = Mappers.getMapper(QuestionMapper.class);

    @Mapping(source = "category.title", target = "categoryTitle")
    @Mapping(source = "text", target = "name")
    @Mapping(source = "payload", target = "details")
    public abstract QuestionDto questionToQuestionDto(Question question);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "category", target = "category")
    @Mapping(source = "createDto.name", target = "text")
    @Mapping(target = "questionnaires", ignore = true)
    @Mapping(target = "company", source="questionnaire.company")
    @Mapping(target = "payload", source="createDto.details")
    public abstract Question questionCreateDtoToModel(
            QuestionCreateDto createDto,
            Questionnaire questionnaire,
            QuestionCategory category
    );

    public abstract QuestionCreateDto upsertDtoToCreateDto(QuestionUpsertDto dto);

    public abstract QuestionUpdateDto upsertDtoToUpdateDto(QuestionUpsertDto dto);

    @AfterMapping
    protected void setQuestionnaire(
            Questionnaire questionnaire,
            QuestionCreateDto createDto,
            @MappingTarget Question question) {
        var isQuestionnaireAlreadyExists = question.getQuestionnaires()
                .stream()
                .anyMatch(questionnaireQuestion -> questionnaireQuestion.getQuestionnaire().equals(questionnaire));
        if (!isQuestionnaireAlreadyExists) {
            var qqId = new QuestionnaireQuestionId(questionnaire.getId(), question.getId());
            var questionnaireQuestion = new QuestionnaireQuestion(qqId, question, questionnaire, createDto.getIndex());
            question.getQuestionnaires().add(questionnaireQuestion);
        }
    }
}
