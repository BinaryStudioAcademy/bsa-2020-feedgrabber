package com.feed_grabber.core.questionCategory.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class QuestionCategoryDto {
    private UUID id;
    private String title;
    private String companyName;
}
