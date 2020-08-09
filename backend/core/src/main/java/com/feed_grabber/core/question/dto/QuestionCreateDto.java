package com.feed_grabber.core.question.dto;

import com.fasterxml.jackson.annotation.JsonRawValue;
import com.feed_grabber.core.question.QuestionType;
import lombok.Value;
import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Value
@NotBlank
public class QuestionCreateDto {
    String text;

    String categoryName;

    QuestionType type;

    UUID questionnaireId;

    @JsonRawValue
    String payload;
}
