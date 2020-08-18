package com.feed_grabber.core.question.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.feed_grabber.core.question.serializers.QuestionUpdateDes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonDeserialize(using = QuestionUpdateDes.class)
public class QuestionUpdateDto {
    @NotNull
    UUID id;

    @NotBlank
    String name;

    @NotNull
    String categoryTitle;

    String details;

    Integer index;
}
