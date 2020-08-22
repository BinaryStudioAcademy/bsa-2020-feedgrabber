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

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportDetailsDto {
    QuestionnaireDetailsDto questionnaire;
    UserDetailsReportDTO targetUser;
    UserDetailsReportDTO requestMaker;
    List<ResponseDetailsDto> responses;
    private LocalDateTime requestCreationDate;
    private LocalDateTime requestExpirationDate;
}
