package com.feed_grabber.core.rabbit;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.stereotype.Component;

import java.util.concurrent.CountDownLatch;

@EnableRabbit
@Component
public class Receiver {
    private final CountDownLatch latch = new CountDownLatch(1);
    public void receiveMessage(String message) {
        System.out.println("Received <" + message + ">");
        latch.countDown();
    }
    public CountDownLatch getLatch() {
        return latch;
    }
}