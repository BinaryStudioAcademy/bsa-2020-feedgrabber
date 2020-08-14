package com.feed_grabber.core.rabbit;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Receiver {
    @RabbitListener(queues = "${rabbitmq.queue.response}")
    public void receive(String text) {
        log.info(" [x] Received '{}'", text);
    }
}