package com.feed_grabber.core.questionnaire.dto;

import com.feed_grabber.core.question.dto.QuestionCreateDto;
import lombok.Value;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Value
public class QuestionnaireCreateDto {
    @NotBlank
    String title;

    @NotNull
    List<QuestionCreateDto> questions;
}
