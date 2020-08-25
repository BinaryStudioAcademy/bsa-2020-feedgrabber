package com.feed_grabber.core.question.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.feed_grabber.core.question.QuestionType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class QuestionDto {
    UUID id;
    String name;
    String categoryTitle;
    QuestionType type;
    String details;
    @JsonProperty("isRequired")
    boolean isRequired;
}
