package com.feed_grabber.core.request.dto;

import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestQuestionnaireDto {
    @NotNull
    private UUID requestId;

    @NotNull
    private QuestionnaireDto questionnaire;
}
