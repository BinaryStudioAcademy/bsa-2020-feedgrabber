package com.feed_grabber.core.report.dto;

import com.feed_grabber.core.questionnaire.dto.QuestionnaireDetailsDto;
import com.feed_grabber.core.response.dto.ResponseDetailsDto;
import com.feed_grabber.core.user.dto.UserDetailsReportDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportDetailsDto {
    private UUID requestId;
    private QuestionnaireDetailsDto questionnaire;
    private UserDetailsReportDTO targetUser;
    private UserDetailsReportDTO requestMaker;
    private List<ResponseDetailsDto> responses;
    private Date requestCreationDate;
    private Date requestExpirationDate;
    private String excelReportLink;
    private String pptReportLink;
}
