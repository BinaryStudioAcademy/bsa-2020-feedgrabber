package com.feed_grabber.core.sections;

import com.feed_grabber.core.question.QuestionMapper;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.questionnaire.QuestionnaireMapper;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.sections.dto.SectionCreateDto;
import com.feed_grabber.core.sections.dto.SectionDto;
import com.feed_grabber.core.sections.dto.SectionQuestionsDto;
import com.feed_grabber.core.sections.model.Section;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Comparator;
import java.util.stream.Collectors;

@Mapper(uses = {QuestionMapper.class, QuestionnaireMapper.class})
public interface SectionMapper {
    SectionMapper MAPPER = Mappers.getMapper(SectionMapper.class);

    @Mapping(target = "questionnaire", source = "questionnaire")
    @Mapping(target = "title", source = "dto.title")
    @Mapping(target = "order", source = "dto.index")
    @Mapping(target = "questions", ignore = true)
    @Mapping(target = "description", ignore = true)
    Section createDtoToModel(SectionCreateDto dto, Questionnaire questionnaire);

    SectionDto modelToDto(Section section);

    default SectionQuestionsDto modelToExtendedDto(Section section) {
        return new SectionQuestionsDto(
                section.getId(), section.getTitle(), section.getDescription(),
                section.getQuestions().stream().map(i -> {
                    var index = i.getOrderIndex();
                    var q = i.getQuestion();
                    return new QuestionDto(
                            q.getId(),
                            q.getText(),
                            index,
                            q.getCategory().getTitle(),
                            q.getType(),
                            q.getPayload(),
                            q.isRequired()
                    );
                })
                        .sorted(Comparator.comparing(QuestionDto::getIndex))
                        .collect(Collectors.toList())
        );
    }
}
