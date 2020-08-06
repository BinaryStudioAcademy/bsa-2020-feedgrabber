package com.feed_grabber.core.questionCategory.dto;

import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import lombok.Value;
import lombok.Builder;

import java.util.UUID;

@Value
@Builder
public class QuestionCategoryDto {
    UUID id;
    String title;
    String companyName;

    public static QuestionCategoryDto fromEntity(QuestionCategory questionCategory) {
        return QuestionCategoryDto.builder()
                .id(questionCategory.getId())
                .title(questionCategory.getTitle())
                .companyName(questionCategory.getCompany().getName())
                .build();
    }
}
