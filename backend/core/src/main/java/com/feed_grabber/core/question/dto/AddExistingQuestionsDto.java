package com.feed_grabber.core.question.dto;

import com.feed_grabber.core.question.model.Question;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
public class AddExistingQuestionsDto {
    private Set<QuestionUpdateDto> questions;
    private UUID questionnaireId;
}
