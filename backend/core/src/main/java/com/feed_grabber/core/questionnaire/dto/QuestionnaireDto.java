package com.feed_grabber.core.questionnaire.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class QuestionnaireDto {
    private UUID id;
    private String title;
    private String companyName;
}
