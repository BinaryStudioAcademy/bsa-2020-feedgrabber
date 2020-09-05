package com.feed_grabber.core.question.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
public class AddExistingQuestionBySectionDto {
    private IndexDto questionIndexed;
    private UUID sectionId;
}
