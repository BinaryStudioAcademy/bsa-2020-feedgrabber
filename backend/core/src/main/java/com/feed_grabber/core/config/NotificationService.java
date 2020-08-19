package com.feed_grabber.core.config;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class NotificationService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    public NotificationService(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    public <T> void sendMessageToUser(String topic, T payload) {
        var name = SecurityContextHolder.getContext().getAuthentication().getName();
        simpMessagingTemplate.convertAndSend( "/topic/" + topic, payload);
    }

    public <T> void sendMessageToUsers(List<String> userNames, String topic, T payload) {
//        userNames.forEach(n -> sendMessageToUser(n, topic, payload));
    }
}
