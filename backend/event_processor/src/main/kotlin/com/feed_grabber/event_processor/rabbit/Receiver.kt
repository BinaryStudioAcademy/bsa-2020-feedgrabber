package com.feed_grabber.event_processor.rabbit

import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component


@Component
class Receiver {
    @RabbitListener(queues = ["\${rabbitmq.queue.response}"])
    fun receive(text: String?) {
        println(" [x] Received $text")
    }
}