package com.feed_grabber.core.report.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class ReportLinksDto {
    UUID requestId;
    String excelReportLink;
    String pptReportLink;
}
