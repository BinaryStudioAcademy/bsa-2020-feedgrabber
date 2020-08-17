package com.feed_grabber.core.request.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestCreationRequestDto {
    @NotNull
    private UUID questionnaireId;

    @NotNull
    private UUID targetUserId;

    private Date expirationDate;

    @NotNull
    private List<UUID> respondentIds;

    @NotNull
    private List<UUID> teamIds;

    @NotNull
    private Boolean notifyUsers;

    @NotNull
    private Boolean generateReport;

    @NotNull
    private Boolean includeTargetUser;
}
