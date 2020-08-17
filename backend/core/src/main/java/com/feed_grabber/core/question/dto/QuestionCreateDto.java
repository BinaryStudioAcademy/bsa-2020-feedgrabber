package com.feed_grabber.core.question.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.feed_grabber.core.question.serializers.CustomDes;
import com.feed_grabber.core.question.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Optional;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonDeserialize(using = CustomDes.class)
public class QuestionCreateDto {
    @NotBlank
    String name;

    String categoryTitle;

    @NotNull
    QuestionType type;

    Optional<UUID> questionnaireId;

    String details;

    Integer index;
}
