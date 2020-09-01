package com.feed_grabber.event_processor.schedule.triggers

import org.quartz.JobDetail
import org.quartz.SimpleScheduleBuilder.simpleSchedule
import org.quartz.Trigger
import org.quartz.TriggerBuilder.newTrigger

fun getTrigger(job: JobDetail): Trigger {
    return newTrigger()
            .withIdentity("job1", "closeRequest")
            .withSchedule(simpleSchedule().withIntervalInSeconds(3))
//            .startAt(Date())
            .forJob(job).build()
}
