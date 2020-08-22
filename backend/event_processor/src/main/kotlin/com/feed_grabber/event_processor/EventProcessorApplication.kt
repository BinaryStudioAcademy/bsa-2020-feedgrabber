package com.feed_grabber.event_processor

import com.feed_grabber.event_processor.report.ReportApiHelper
import com.feed_grabber.event_processor.report.ReportService
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import java.util.*

@SpringBootApplication
class EventProcessorApplication

fun main(args: Array<String>) {
    runApplication<EventProcessorApplication>(*args)

    val service = ReportApiHelper()
    val res = service.fetchReportData(UUID.fromString("23acfbc5-ba8d-42d7-9cfa-cb5f348284a6"))
    print(res)
    val report = ReportService().parseIncomingData(res)
    print(report)
}
