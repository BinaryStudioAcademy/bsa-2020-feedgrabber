package com.feed_grabber.core.questionnaireResponse.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class QuestionnaireResponseDto {
    private UUID id;
    private UUID request_id;
    private UUID respondent_id;
}
