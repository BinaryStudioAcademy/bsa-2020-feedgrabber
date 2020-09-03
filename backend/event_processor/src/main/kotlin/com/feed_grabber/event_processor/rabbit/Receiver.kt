package com.feed_grabber.event_processor.rabbit

import com.feed_grabber.event_processor.email.EmailSender
import com.feed_grabber.event_processor.schedule.ScheduleService
import com.feed_grabber.event_processor.rabbit.entityExample.MailEntity
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class Receiver(
        @Autowired val emailSender: EmailSender,
        @Autowired val scheduleService: ScheduleService
) {
    @RabbitListener(queues = ["\${rabbitmq.queue}"])
    fun receive(mailEntity: MailEntity?) {
        println(mailEntity?.getType())
        println(mailEntity?.getMessage())
        emailSender.sendMail(mailEntity)
    }

    @RabbitListener(queues = ["\${rabbitmq.queue.report.close}"])
    fun receiveCloseRequest(closeRequest: CloseRequest) {
        scheduleService.scheduleCloseRequestJob(closeRequest.getRequestId(), closeRequest.getCloseDate())
    }
}
