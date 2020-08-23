package com.feed_grabber.event_processor.report

import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.util.*

@Component
class Runner(val api: ReportApiHelper, val service: ReportService) : CommandLineRunner {
    override fun run(vararg args: String?) {
//        val res = api.fetchReportData(UUID.fromString("d19657e4-2a34-4c71-88b1-7d5e63289bd6"))
//        println(res)
//        val report = service.parseAndSaveReport(res)
//        println(report)
//        println(service.getFrontendData(report.id))
    }
}
