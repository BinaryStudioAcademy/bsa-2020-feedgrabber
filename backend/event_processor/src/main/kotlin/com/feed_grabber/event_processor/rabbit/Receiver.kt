package com.feed_grabber.event_processor.rabbit

import com.feed_grabber.event_processor.rabbit.entityExample.MailEntity
import com.feed_grabber.event_processor.email.EmailSender
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component
import org.springframework.beans.factory.annotation.Autowired

@Component
class Receiver(
	@Autowired val emailSender: EmailSender
) {
    @RabbitListener(queues = ["\${rabbitmq.queue}"])
    fun receive(mailEntity: MailEntity?) {
		println(mailEntity?.getType())
		println(mailEntity?.getMessage())
		emailSender.sendMail(mailEntity)
    }
}
