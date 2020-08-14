package com.feed_grabber.core.questionnaire.dto;


import com.feed_grabber.core.question.dto.QuestionUpsertDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class QuestionnaireOrderedDto {
    private UUID id;
    private List<QuestionUpsertDto> questions;
}
