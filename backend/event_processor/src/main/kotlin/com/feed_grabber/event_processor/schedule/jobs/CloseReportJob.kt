package com.feed_grabber.event_processor.schedule.jobs;

import org.quartz.*
import java.util.*

class CloseReportJob: Job {

    override fun execute(context: JobExecutionContext?) {
        val requestId: UUID = context?.mergedJobDataMap?.get("requestId") as UUID
        val closeDate: Date = context?.mergedJobDataMap?.get("closeDate") as Date
        println("Send message to core: [$requestId - $closeDate]")
    }

}

fun buildCloseReportJob(requestId: UUID, closeDate: Date): JobDetail {
    val map = JobDataMap()
    map["requestId"] = requestId
    map["closeDate"] = closeDate // delete in production
    return JobBuilder.newJob()
            .ofType(CloseReportJob::class.java)
            .usingJobData(map)
            .build()
//            .withIdentity("", "")
}
