package com.feed_grabber.event_processor.schedule.triggers

import org.quartz.JobDetail
import org.quartz.Trigger
import org.quartz.TriggerBuilder.newTrigger
import java.util.*

fun getTrigger(job: JobDetail, date: Date): Trigger {
    return newTrigger()
            .withIdentity("job1", "closeRequest")
//            .withSchedule(simpleSchedule().withIntervalInSeconds(3).repeatForever())
            .startAt(date)
            .forJob(job).build()
}
