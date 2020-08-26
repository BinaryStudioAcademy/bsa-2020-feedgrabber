package com.feed_grabber.core.questionnaire.dto;


import lombok.Data;

import java.util.UUID;

@Data
public class QuestionDeleteDto {
    private UUID questionnaireId;
    private UUID questionId;
}
