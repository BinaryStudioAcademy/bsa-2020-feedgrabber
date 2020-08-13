package com.feed_grabber.core.responseAnswer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseAnswerCreateDto {
    private String text;
    private UUID questionId;
    private UUID responseId;
}
