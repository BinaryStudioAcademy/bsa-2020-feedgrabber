package com.feed_grabber.event_processor.schedule

import com.feed_grabber.event_processor.schedule.jobs.buildCloseReportJob
import com.feed_grabber.event_processor.schedule.triggers.getTrigger
import org.quartz.JobDetail
import org.quartz.Scheduler
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class ScheduleService(
        @Autowired val scheduler: Scheduler
) {
    fun scheduleCloseRequestJob(requestId: UUID, closeDate: Date) {
        println("Add new job")
        val newJob: JobDetail = buildCloseReportJob(requestId, closeDate)
        val date: Date = scheduler.scheduleJob(newJob, getTrigger(newJob, closeDate))
        println("New job scheduled: $date")
    }
}