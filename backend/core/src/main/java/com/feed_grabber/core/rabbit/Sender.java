package com.feed_grabber.core.rabbit;

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

    @Autowired
    private final RabbitTemplate template;

    public void sendToFileProcessor(String text) {
        log.info(" [x] Sending...");
        this.template.convertAndSend(exchange, routingKey, text);
        log.info(" [x] Sent '{}'", text);
    }

}