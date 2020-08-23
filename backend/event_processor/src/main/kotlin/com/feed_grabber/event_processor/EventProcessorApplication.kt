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

//    val service = ReportApiHelper()
//    val res = service.fetchReportData(UUID.fromString("88d9d895-5cd4-47fc-807b-809cb73ffd74"))
//    println(res)
//    val report = ReportService().parseIncomingData(res)
//    println(report)
}
