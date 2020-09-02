package com.feed_grabber.core.report.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportShortDto {
    private UUID id;
    private String title;
    private Date closeDate;
    private String author;
}
