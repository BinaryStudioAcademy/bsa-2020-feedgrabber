package com.feed_grabber.event_processor.report

import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.util.*

@Component
class Runner(val api: ReportApiHelper, val service: ReportService) : CommandLineRunner {
    override fun run(vararg args: String?) {
//        val res = api.fetchReportData(UUID.fromString("ff03d10b-2c65-4c6c-803d-d1ff63f5066c"))
//        println(res)
//        val report = service.parseAndSaveReport(res)
//        println(report)
//        println(service.getFrontendData(report.id))
    }
}
