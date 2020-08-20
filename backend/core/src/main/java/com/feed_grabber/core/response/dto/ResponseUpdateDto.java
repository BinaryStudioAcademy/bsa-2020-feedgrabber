package com.feed_grabber.core.response.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.feed_grabber.core.response.KeepAsJsonDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseUpdateDto {
    @NotNull
    private UUID id;

    @NotNull
    private UUID requestId;

    @JsonDeserialize(using = KeepAsJsonDeserializer.class)
    private String payload;
}
