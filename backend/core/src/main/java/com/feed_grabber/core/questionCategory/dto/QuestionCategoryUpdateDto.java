package com.feed_grabber.core.questionCategory.dto;

import lombok.Value;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.UUID;

@Value
public class QuestionCategoryUpdateDto {
    @NotNull
    UUID id;
    @NotBlank
    String title;
    @NotNull
    UUID companyId;
}
