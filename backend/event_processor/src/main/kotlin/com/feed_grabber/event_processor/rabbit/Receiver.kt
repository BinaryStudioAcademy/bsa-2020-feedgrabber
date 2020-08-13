package com.feed_grabber.core.rabbit

import org.springframework.amqp.rabbit.annotation.EnableRabbit
import org.springframework.stereotype.Component
import java.util.concurrent.CountDownLatch

@EnableRabbit
@Component
class Receiver {
    private val latch: CountDownLatch = CountDownLatch(1)
    fun receiveMessage(message: String) {
        System.out.println("Received <$message>")
        latch.countDown()
    }

    fun getLatch(): CountDownLatch {
        return latch
    }
}