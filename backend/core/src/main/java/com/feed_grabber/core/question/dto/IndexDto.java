package com.feed_grabber.core.question.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class IndexDto {
    UUID questionId;
    Integer index;
}
