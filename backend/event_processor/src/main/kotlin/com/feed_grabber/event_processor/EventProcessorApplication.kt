package com.feed_grabber.event_processor

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class EventProcessorApplication

fun main(args: Array<String>) {
    runApplication<EventProcessorApplication>(*args)
//    val service = ReportApiHelper()
//    print(service.getReportByRequestId(UUID.fromString("cda8c5b9-d18e-4868-a218-1db3308c3c45")))
}
