package com.feed_grabber.core.questionnaire.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.feed_grabber.core.sections.dto.SectionQuestionsDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionnaireFullDto {
    private UUID id;
    private String title;
    private String companyName;
    @JsonProperty("isEditingEnabled")
    private boolean isEditingEnabled;
    private List<SectionQuestionsDto> sections;
}
