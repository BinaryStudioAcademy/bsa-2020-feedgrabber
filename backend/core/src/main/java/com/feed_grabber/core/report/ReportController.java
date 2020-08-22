package com.feed_grabber.core.report;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.report.dto.ReportDetailsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/get")
    public ReportDetailsDto getReport(@RequestParam UUID requestId) throws NotFoundException {
        return reportService.getReport(requestId);
    }

    @PostMapping("/excel")
    public void generateReport(@RequestParam UUID requestId) {
        reportService.sendExcelReportGenerationRequest(requestId);
    }
}
