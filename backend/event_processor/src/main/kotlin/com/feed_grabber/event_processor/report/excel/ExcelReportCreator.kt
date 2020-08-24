package com.feed_grabber.event_processor.report.excel

import com.feed_grabber.event_processor.report.ReportApiHelper
import com.feed_grabber.event_processor.report.ReportService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service

class ExcelReportCreator(@Autowired private val apiHelper: ReportApiHelper,
                         @Autowired private val service: ReportService,
                         @Autowired private val reportGenerator: ExcelReportGenerator) {

    fun create(requestId: UUID) {
        val report = apiHelper.fetchReportData(requestId)
        val data = service.parseIncomingData(report)
        reportGenerator.generate(report, data.questions)
    }
}

