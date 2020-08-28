package com.feed_grabber.core.sections.dto;

import com.feed_grabber.core.question.dto.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectionQuestionsDto {
    @NotNull
    UUID id;

    @NotNull
    String title;

    String description;

    List<QuestionDto> questions;
}
