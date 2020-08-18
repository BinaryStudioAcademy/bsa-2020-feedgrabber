package com.feed_grabber.core.rabbit;

import com.feed_grabber.core.rabbit.entityExample.PostEntity;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Sender {
    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.routing-key}")
    private String routingKey;

    private final RabbitTemplate template;

    @Autowired
    public Sender(RabbitTemplate template) {
        this.template = template;
    }

    public void send(PostEntity postEntity) {
        System.out.println("Sending...");
        log.info(" [x] Sending...");
        this.template.convertAndSend(exchange, routingKey, postEntity);
        log.info(" [x] Sent '{}'", postEntity);
    }

}