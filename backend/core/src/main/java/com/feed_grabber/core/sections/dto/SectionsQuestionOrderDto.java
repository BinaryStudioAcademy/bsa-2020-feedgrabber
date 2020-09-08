package com.feed_grabber.core.sections.dto;

import com.feed_grabber.core.question.dto.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SectionsQuestionOrderDto {
    Integer oldIndex;
    Integer newIndex;
    UUID oldSection;
    UUID newSection;
}
