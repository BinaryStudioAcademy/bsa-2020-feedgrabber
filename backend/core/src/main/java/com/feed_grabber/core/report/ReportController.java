package com.feed_grabber.core.report;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.report.dto.ReportShortDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.feed_grabber.core.auth.security.TokenService;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import static com.feed_grabber.core.role.RoleConstants.*;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService service;

    @GetMapping("/{requestId}")
    public AppResponse<String> getReport(@PathVariable UUID requestId) throws IOException, NotFoundException {
        final String role = TokenService.getRoleName();
        final UUID userId = TokenService.getUserId();
		service.hasAccess(requestId, userId, role);
        var response = service.isRequestClosed(requestId) ? service.getReport(requestId) : service.generateReport(requestId);
        return new AppResponse<>(response);
    }

    @PostMapping("/excel")
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public void generateReport(@RequestParam UUID requestId) {
        service.sendExcelReportGenerationRequest(requestId);
    }

    @GetMapping("/all")
    public AppResponse<List<ReportShortDto>> getAllAvailableReports() {
        final String role = TokenService.getRoleName();
        final UUID companyId = TokenService.getCompanyId();
        final UUID userId = TokenService.getUserId();
        return new AppResponse<>(service.getAllAvailableReports(userId, role, companyId));
    }
}
