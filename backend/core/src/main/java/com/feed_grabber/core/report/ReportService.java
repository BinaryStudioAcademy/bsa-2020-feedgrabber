package com.feed_grabber.core.report;

import com.feed_grabber.core.rabbit.Sender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ReportService {

    private final Sender sender;

    @Autowired
    public ReportService(Sender sender) {
        this.sender = sender;
    }

    public void sendExcelReportGenerationRequest(UUID requestId) {
        sender.sendExcelReportGenerationRequest(requestId);
    }
}
