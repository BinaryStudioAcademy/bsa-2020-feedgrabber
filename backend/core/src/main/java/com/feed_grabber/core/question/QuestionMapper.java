package com.feed_grabber.core.question;

import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public abstract class QuestionMapper {
    public static QuestionMapper MAPPER = Mappers.getMapper(QuestionMapper.class);

    @Mapping(source = "question.id", target = "id")
    @Mapping(source = "question.category.title", target = "categoryTitle")
    @Mapping(source = "questionnaire.title", target = "questionnaireTitle")
    public abstract QuestionDto questionToQuestionDto(Question question, Questionnaire questionnaire);

    @Mapping(source = "category.title", target = "categoryTitle")
    @Mapping(target = "questionnaireTitle",
            expression = "java(question.getQuestionnaires().size() > 0 ? question.getQuestionnaires().get(0).getTitle() : null)")
    public abstract QuestionDto questionToQuestionDto(Question question);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "category", target = "category")
    @Mapping(source = "createDto.text", target = "text")
    @Mapping(target = "questionnaires", ignore = true)
    @Mapping(target = "company", source="questionnaire.company")
    public abstract Question questionCreateDtoToModel(QuestionCreateDto createDto, Questionnaire questionnaire, QuestionCategory category);

    @AfterMapping
    protected void setQuestionnaire(Questionnaire questionnaire, @MappingTarget Question question) {
        if (!question.getQuestionnaires().contains(questionnaire)) {
            question.getQuestionnaires().add(questionnaire);
        }
    }
}
