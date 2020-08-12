package com.feed_grabber.core.questionnaireResponse.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionnaireResponseCreateDto {
    private UUID requestId;
    private UUID respondentId;
}
