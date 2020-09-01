package com.feed_grabber.event_processor.rabbit

import com.feed_grabber.event_processor.email.EmailSender
import com.feed_grabber.event_processor.rabbit.entityExample.MailEntity
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class Receiver(@Autowired val emailSender: EmailSender) {
    @RabbitListener(queues = ["\${rabbitmq.queue}"])
    fun receive(mailEntity: MailEntity?) {
        println(mailEntity?.getType())
        println(mailEntity?.getMessage())
        emailSender.sendMail(mailEntity)
    }

//    @RabbitListener(queues = ["\${rabbitmq.queue.report}"])
//    fun receiveExcelGenerationRequest(requestId: UUID) {
//        reportService.generateExcelAndPPTReports(requestId)
//    }

//    @RabbitListener(queues = ["\${rabbitmq.queue.report.ppt}"])
//    fun receivePPTGenerationRequest(requestId: UUID) {
//        pptReportGenerator.create(requestId)
//    }

}
