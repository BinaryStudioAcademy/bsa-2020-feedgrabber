package com.feed_grabber.core.question.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class QuestionDto {
    UUID id;
    String text;
    String categoryTitle;
}
