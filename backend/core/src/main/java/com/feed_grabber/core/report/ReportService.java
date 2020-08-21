package com.feed_grabber.core.report;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.rabbit.Sender;
import com.feed_grabber.core.report.dto.ReportDetailsDto;
import com.feed_grabber.core.request.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ReportService {

    private final RequestRepository requestRepository;

    private final Sender sender;

    @Autowired
    public ReportService(RequestRepository requestRepository, Sender sender) {
        this.requestRepository = requestRepository;
        this.sender = sender;
    }

    public void sendExcelReportGenerationRequest(UUID requestId) {
        sender.sendExcelReportGenerationRequest(requestId);
    }

    public ReportDetailsDto getReport(UUID requestId) throws NotFoundException {
        var request = requestRepository.findById(requestId).orElseThrow(NotFoundException::new);
        return ReportMapper.MAPPER.requestToReportDetails(request);
    }
}
