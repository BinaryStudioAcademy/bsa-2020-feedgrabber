package com.feed_grabber.core.request.dto;

import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PendingRequestDto {
    private UUID requestId;
    private QuestionnaireDto questionnaire;
    private Date expirationDate;
    private Date answeredAt;
    private Date closeDate;
    private UUID responseId;
}
