package com.feed_grabber.core.report;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.UUID;

import static com.feed_grabber.core.role.RoleConstants.*;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService service;

    @GetMapping("/{requestId}")
    public AppResponse<String> getReport(@PathVariable UUID requestId) throws IOException, NotFoundException {
        var response = service.isRequestClosed(requestId) ? service.getReport(requestId) : service.generateReport(requestId);
        return new AppResponse<>(response);
    }

//    @PostMapping("/excel")
//    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
//    public void generateReport(@RequestParam UUID requestId) {
//        service.sendExcelReportGenerationRequest(requestId);
//    }
//
//    @PostMapping("/ppt")
//    public void generatePPTReport(@RequestParam UUID requestId) {
//        service.sendPPTReportGenerationRequest(requestId);
//    }
}
