package com.feed_grabber.core.question.dto;

import com.fasterxml.jackson.annotation.JsonRawValue;
import com.feed_grabber.core.question.QuestionType;
import lombok.Value;
import javax.validation.constraints.NotBlank;

@Value
@NotBlank
public class QuestionCreateDto {
    String text;

    String categoryName;

    QuestionType type;

    @JsonRawValue
    String payload;
}
