package com.feed_grabber.core.questionnaire.dto;

import lombok.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Value
public class QuestionnaireCreateDto {
    @NotBlank
    String title;
    @NotNull
    UUID companyId;
}
