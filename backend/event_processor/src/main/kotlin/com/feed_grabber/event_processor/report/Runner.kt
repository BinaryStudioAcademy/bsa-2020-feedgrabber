package com.feed_grabber.event_processor.report

import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.util.*

@Component
class Runner(val api: ReportApiHelper, val service: ReportService) : CommandLineRunner {
    override fun run(vararg args: String?) {
//        val res = api.fetchReportData(UUID.fromString("e78c11bd-908a-4674-a6e6-aa3b8720db4e"))
//        println(res)
//        val report = service.parseAndSaveReport(res)
//        println(report)
//        println(service.getFrontendData(report.id))
    }
}
