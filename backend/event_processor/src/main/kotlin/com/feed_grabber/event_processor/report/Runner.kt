package com.feed_grabber.event_processor.report

import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.util.*

@Component
class Runner(val api: ReportApiHelper, val service: ReportService) : CommandLineRunner {
    override fun run(vararg args: String?) {
//        val res = api.fetchReportData(UUID.fromString("1ec7858e-ec0e-45e0-8d89-0217dbee3680"))
//        println(res)
//        val report = service.parseAndSaveReport(res)
//        println(report)
//        println(service.getFrontendData(report.id))
    }
}
