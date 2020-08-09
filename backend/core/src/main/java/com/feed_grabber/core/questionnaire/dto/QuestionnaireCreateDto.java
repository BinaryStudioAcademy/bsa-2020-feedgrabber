package com.feed_grabber.core.questionnaire.dto;

import lombok.Value;
import javax.validation.constraints.NotBlank;

@Value
public class QuestionnaireCreateDto {
    @NotBlank
    String title;
}
