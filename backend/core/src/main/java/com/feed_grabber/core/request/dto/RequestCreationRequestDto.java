package com.feed_grabber.core.request.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestCreationRequestDto {
    private UUID questionnaireId;
    private UUID targetUserId;
    private Date expirationDate;
    private List<UUID> respondentIds;
    private Boolean notifyUsers;
    private Boolean generateReport;
}
