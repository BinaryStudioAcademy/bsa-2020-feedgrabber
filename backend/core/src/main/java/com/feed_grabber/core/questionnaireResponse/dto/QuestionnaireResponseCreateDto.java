package com.feed_grabber.core.questionnaireResponse.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class QuestionnaireResponseCreateDto {
    private UUID requestId;
}
