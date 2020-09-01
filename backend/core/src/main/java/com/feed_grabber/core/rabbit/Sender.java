package com.feed_grabber.core.rabbit;

import com.feed_grabber.core.rabbit.entityExample.MailEntity;
import com.feed_grabber.core.rabbit.entityExample.MailType;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

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

    public void sendToProcessor(String message, String email, String type) {
        log.info(" [x] Sending...");
        this.template.convertAndSend(exchange, routingKey, new MailEntity(MailType.valueOf(type), message, email));
        log.info(" [x] Sent '{}'", message);
    }
}
