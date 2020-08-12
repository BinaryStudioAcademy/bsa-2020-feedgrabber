package com.feed_grabber.core.question.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.feed_grabber.core.question.CustomDes;
import com.feed_grabber.core.question.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@AllArgsConstructor
@JsonDeserialize(using = CustomDes.class)
public class QuestionCreateDto {
    @NotBlank
    String name;

    String category;

    @NotNull
    QuestionType type;

//    @NotNull
//    UUID questionnaireId;

    String details;
}
