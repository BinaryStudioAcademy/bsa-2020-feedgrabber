package com.feed_grabber.core.questionnaire.dto;

import com.feed_grabber.core.question.dto.QuestionDto;

import java.util.List;
import java.util.UUID;

public class QuestionnaireDetailsDto {
    private UUID id;
    private String title;
    private String companyName;
    private List<QuestionDto> questions;
}
