package com.feed_grabber.core.question.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class AddExistingQuestionDto {
    private UUID questionId;
    private UUID questionnaireId;
}
