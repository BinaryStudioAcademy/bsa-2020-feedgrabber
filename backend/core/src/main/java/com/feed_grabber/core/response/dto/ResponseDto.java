package com.feed_grabber.core.response.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.response.KeepAsJsonDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto {
    @NotNull
    private UUID id;

    @NotNull
    private UUID requestId;

    @NotNull
    private UUID userId;

    @NotNull
    private QuestionnaireDto questionnaire;

    @JsonDeserialize(using = KeepAsJsonDeserializer.class)
    private String payload;

    private boolean changeable;

    @NotNull
    private Date answeredAt;
}
