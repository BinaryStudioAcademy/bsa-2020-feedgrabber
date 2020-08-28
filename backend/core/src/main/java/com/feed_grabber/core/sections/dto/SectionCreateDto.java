package com.feed_grabber.core.sections.dto;

import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectionCreateDto {
    String title;

    UUID questionnaireId;
}
