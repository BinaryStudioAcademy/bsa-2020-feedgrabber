package com.feed_grabber.core.question.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.feed_grabber.core.question.CustomDes;
import com.feed_grabber.core.question.QuestionUpdateDes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;


@Data
@AllArgsConstructor
@JsonDeserialize(using = QuestionUpdateDes.class)
public class QuestionUpdateDto {
    @NotNull
    UUID id;

    @NotBlank
    String name;

    @NotNull
    String categoryTitle;

    String details;
}
