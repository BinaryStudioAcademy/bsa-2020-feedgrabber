package com.feed_grabber.core.report;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.report.dto.ReportDetailsDto;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.UUID;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    private final String URI_EP = "http://localhost:5001/ep/report";

    @CrossOrigin(origins = "http://localhost")
    @GetMapping
    public AppResponse<ReportDetailsDto> getDataForReport(@RequestParam UUID requestId) throws NotFoundException {
        return new AppResponse<>(reportService.getDataForReport(requestId));
    }

    @GetMapping("/{id}")
    public AppResponse<String> getReport(@PathVariable UUID id)
            throws URISyntaxException, IOException, InterruptedException, NotFoundException {

        var body = new ObjectMapper().writeValueAsString(reportService.getDataForReport(id));

        var request = HttpRequest.newBuilder(new URI(URI_EP))
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .header("Content-Type", "application/json; utf-8")
                .build();

        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        return new AppResponse<>(response.body());
    }

    @PostMapping("/excel")
    public void generateReport(@RequestParam UUID requestId) {
        reportService.sendExcelReportGenerationRequest(requestId);
    }
}
