package com.feed_grabber.core.response.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.feed_grabber.core.response.KeepAsJsonDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCreateDto {
    @NotNull
    private UUID requestId;

    @NotNull
    private UUID userId;

    @JsonDeserialize(using = KeepAsJsonDeserializer.class)
    private String payload;
}
