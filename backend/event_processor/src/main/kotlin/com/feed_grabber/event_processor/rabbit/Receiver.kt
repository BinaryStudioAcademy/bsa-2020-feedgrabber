package com.feed_grabber.event_processor.rabbit

import com.feed_grabber.event_processor.rabbit.entityExample.MailEntity
import com.feed_grabber.event_processor.email.EmailSender
import com.feed_grabber.event_processor.report.excel.ExcelReportGenerator
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component
import org.springframework.beans.factory.annotation.Autowired
import java.util.*

@Component
class Receiver(
        @Autowired val emailSender: EmailSender,
        @Autowired val generator: ExcelReportGenerator
) {
    @RabbitListener(queues = ["\${rabbitmq.queue}"])
    fun receive(mailEntity: MailEntity?) {
        println(mailEntity?.getType())
        println(mailEntity?.getMessage())
        emailSender.sendMail(mailEntity)
    }

    @RabbitListener(queues = ["\${rabbitmq.queue.report}"])
    fun receiveExcelGenerationRequest(requestId: UUID) {
        generator.generate(requestId)
    }
}
