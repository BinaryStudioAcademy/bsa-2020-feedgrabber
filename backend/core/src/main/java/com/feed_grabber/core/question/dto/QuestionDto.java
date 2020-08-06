package com.feed_grabber.core.question.dto;

import com.feed_grabber.core.question.model.Question;
import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class QuestionDto {
    UUID id;
    String text;
    String questionnaireTitle;
    String categoryTitle;

    public static QuestionDto fromEntity(Question question) {
        return QuestionDto.builder()
                .id(question.getId())
                .text(question.getText())
                .questionnaireTitle(question.getQuestionnaire().getTitle())
                .categoryTitle(question.getCategory().getTitle())
                .build();
    }
}
