package com.feed_grabber.core.request.dto;

import com.feed_grabber.core.user.dto.UserShortDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestShortDto {
    private UUID requestId;
    private UserShortDto targetUser;
    private UserShortDto requestMaker;
    private Date creationDate;
    private Date expirationDate;
    private Boolean generateReport;
    private Boolean notifyUsers;
    private Date closeDate;
}
