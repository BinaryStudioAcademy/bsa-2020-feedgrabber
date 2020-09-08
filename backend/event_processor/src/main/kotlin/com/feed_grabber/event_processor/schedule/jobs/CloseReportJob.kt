package com.feed_grabber.event_processor.schedule.jobs;

import com.feed_grabber.event_processor.rabbit.Sender
import org.quartz.*
import java.util.*

class CloseReportJob: Job {

    override fun execute(context: JobExecutionContext?) {
        val requestId: UUID = context?.mergedJobDataMap?.get("requestId") as UUID
        val sender: Sender = context?.mergedJobDataMap?.get("sender") as Sender
        sender.closeRequestNow(requestId);
        println("Sent message to core: [$requestId]")
    }

}

fun buildCloseReportJob(requestId: UUID, closeDate: Date, sender: Sender): JobDetail {
    val map = JobDataMap()
    map["requestId"] = requestId
    map["sender"] = sender
    return JobBuilder.newJob()
            .ofType(CloseReportJob::class.java)
            .usingJobData(map)
            .build()
}

