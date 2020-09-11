package com.feed_grabber.core.question.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
public class AddExistingQuestionsDto {
    private List<UUID> questions;
    private UUID sectionId;
}
