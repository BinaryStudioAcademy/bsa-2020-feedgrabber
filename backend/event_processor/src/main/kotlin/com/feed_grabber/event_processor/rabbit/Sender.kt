package com.feed_grabber.core.rabbit

import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.util.concurrent.TimeUnit
import kotlin.jvm.Throws

@Component
class Sender(receiver: Receiver, rabbitTemplate: RabbitTemplate) : CommandLineRunner {
    private val rabbitTemplate: RabbitTemplate
    private val receiver: Receiver

    @Override
    @Throws(Exception::class)
    fun run(vararg args: String?) {
        System.out.println("Sending message...")
        rabbitTemplate.convertAndSend(RabbitConfiguration.topicExchangeName,
                "foo.bar", "Hello from RabbitMQ!")
        receiver.getLatch().await(10000, TimeUnit.MILLISECONDS)
    }

    init {
        this.receiver = receiver
        this.rabbitTemplate = rabbitTemplate
    }
}