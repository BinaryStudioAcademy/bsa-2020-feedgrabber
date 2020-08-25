package com.feed_grabber.core.question.dto;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.feed_grabber.core.question.QuestionType;
import com.feed_grabber.core.question.serializers.QuestionUpsertDes;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@AllArgsConstructor
@JsonDeserialize(using = QuestionUpsertDes.class)
public class QuestionUpsertDto {

    UUID id;

    @NotBlank
    String name;

    @NotNull
    String categoryTitle;

    String details;

    Integer index;

    QuestionType type;

    boolean isRequired;
}
