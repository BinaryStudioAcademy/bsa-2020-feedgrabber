package com.feed_grabber.event_processor.report

import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.util.*

@Component
class Runner(val api: ReportApiHelper, val service: ReportService) : CommandLineRunner {
    override fun run(vararg args: String?) {
//        val res = api.fetchReportData(UUID.fromString("88d9d895-5cd4-47fc-807b-809cb73ffd74"))
//        println(res)
//        val report = service.parseAndSaveReport(res)
//        println(report)
//        println(service.getFrontendData(report.id))
    }
}
