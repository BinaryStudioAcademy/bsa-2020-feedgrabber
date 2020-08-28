package com.feed_grabber.core.question.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class QuestionIndexDto {
    UUID sectionId;
    List<IndexDto> questions;
}
