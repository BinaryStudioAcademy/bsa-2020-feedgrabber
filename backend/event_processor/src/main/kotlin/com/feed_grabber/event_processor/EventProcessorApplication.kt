package com.feed_grabber.event_processor

import com.feed_grabber.event_processor.report.ReportService
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import java.util.*

@SpringBootApplication
class EventProcessorApplication

fun main(args: Array<String>) {
	runApplication<EventProcessorApplication>(*args)
    val service = ReportService()
    service.getDataForReport(UUID.fromString("de2cbe59-3cd6-41e3-9cc2-674f801c8c81"))
}
