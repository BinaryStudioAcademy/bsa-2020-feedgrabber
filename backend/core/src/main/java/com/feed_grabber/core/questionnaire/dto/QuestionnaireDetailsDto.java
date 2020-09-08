package com.feed_grabber.core.questionnaire.dto;

import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.sections.dto.SectionQuestionsDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;
@Data
@NoArgsConstructor
public class QuestionnaireDetailsDto {
    private UUID id;
    private String title;
    private String companyName;
    private List<SectionQuestionsDto> sections;
}
