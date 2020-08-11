package com.feed_grabber.core.responseAnswer.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class ResponseAnswerDto {
    private UUID id;
    private String text;
    private UUID questionId;
    private UUID responseId;
}
