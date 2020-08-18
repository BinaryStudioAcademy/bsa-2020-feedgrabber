package com.feed_grabber.core.rabbit;

import com.feed_grabber.core.rabbit.entityExample.MailType;
import com.feed_grabber.core.rabbit.entityExample.PostEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Receiver {
    @RabbitListener(queues = "${rabbitmq.queue.response}")
    public void receive(PostEntity postEntity) {
        if(postEntity.getType() == MailType.RESPONSE) {
            log.info(" [x] Received '{}'", postEntity);
        }
    }
}