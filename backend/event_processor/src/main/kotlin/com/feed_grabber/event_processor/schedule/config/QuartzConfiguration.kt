package com.feed_grabber.event_processor.schedule.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.quartz.SchedulerFactoryBean

@Configuration
class QuartzConfiguration {
    @Bean
    fun scheduler(): SchedulerFactoryBean {
        return SchedulerFactoryBean()
    }
}