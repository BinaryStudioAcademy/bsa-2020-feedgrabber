package com.feed_grabber.core.questionnaire.dto;

import com.feed_grabber.core.questionnaire.model.Questionnaire;
import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class QuestionnaireDto {
    UUID id;
    String title;
    String companyName;

    public static QuestionnaireDto fromEntity(Questionnaire questionnaire) {
        return QuestionnaireDto.builder()
                .id(questionnaire.getId())
                .title(questionnaire.getTitle())
                .companyName(questionnaire.getCompany().getName())
                .build();
    }
}
