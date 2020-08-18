package com.feed_grabber.event_processor.rabbit

import com.feed_grabber.event_processor.rabbit.entityExample.EntityType
import com.feed_grabber.event_processor.rabbit.entityExample.PostEntity
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component

@Component
class Receiver {
    @RabbitListener(queues = ["\${rabbitmq.queue}"])
    fun receive(postEntity: PostEntity?) {
        if(postEntity!!.type == EntityType.REQUEST)
        println(" [x] Received $postEntity")
    }
}