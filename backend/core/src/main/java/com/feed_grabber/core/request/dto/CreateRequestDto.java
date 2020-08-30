package com.feed_grabber.core.request.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.Period;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.time.Year;
import java.time.temporal.TemporalAmount;
import java.time.temporal.TemporalUnit;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateRequestDto {
    @NotNull
    private UUID questionnaireId;

    private UUID targetUserId;

    private Boolean includeTargetUser = false;

    private Date expirationDate;

    private List<UUID> respondentIds = new LinkedList<>();

    private List<UUID> teamIds = new LinkedList<>();

    private Boolean notifyUsers = true;

    private Boolean generateReport = true;

    private boolean changeable = false;
}
