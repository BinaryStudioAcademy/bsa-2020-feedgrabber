package com.feed_grabber.core.report;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.report.dto.ReportDetailsDto;
import com.feed_grabber.core.request.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.UUID;

import static com.feed_grabber.core.role.RoleConstants.*;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService service;

    @Autowired
    private RequestService requestService;

    @GetMapping("/{requestId}")
    public AppResponse<String> getReport(@PathVariable UUID requestId) throws IOException, NotFoundException {
        var response = service.isRequestClosed(requestId) ? service.getReport(requestId) : service.generateReport(requestId);
        return new AppResponse<>(response);
    }

    @CrossOrigin(origins = "http://localhost")
    @GetMapping
    public AppResponse<ReportDetailsDto> getDataForReport(@RequestParam UUID requestId) throws NotFoundException {
        return new AppResponse<>(service.getDataForReport(requestId));
    }

    @PostMapping("/excel")
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public void generateReport(@RequestParam UUID requestId) {
        service.sendExcelReportGenerationRequest(requestId);
    }
}
