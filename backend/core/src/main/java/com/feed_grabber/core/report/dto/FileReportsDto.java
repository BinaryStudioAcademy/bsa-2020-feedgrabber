package com.feed_grabber.core.report.dto;


import com.feed_grabber.core.file.dto.S3FileReportDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileReportsDto {
    UUID requestId;
    S3FileReportDto pptReport;
    S3FileReportDto excelReport;
}
