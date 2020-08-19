package com.feed_grabber.core.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocket implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("*");//.setHandshakeHandler(new CustomHandshakeHandler());
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                var accessor = StompHeaderAccessor.wrap(message);
                var token = accessor.getFirstNativeHeader("auth");
                accessor.removeNativeHeader("auth");
                return MessageBuilder.createMessage(message.getPayload(), accessor.getMessageHeaders());
            }

        });

//        registration.interceptors(new ChannelInterceptorAdapter() {
//            Message<?> preSend(Message<?> message, MessageChannel channel) {
//                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//
//                List tokenList = accessor.getNativeHeader("X-Authorization");
//                accessor.removeNativeHeader("X-Authorization");
//
//                String token = null;
//                if(tokenList != null && tokenList.size > 0) {
//                    token = tokenList.get(0);
//                }
//
//                // validate and convert to a Principal based on your own requirements e.g.
//                // authenticationManager.authenticate(JwtAuthentication(token))
//                Principal yourAuth = token == null ? null : [...];
//
//                if (accessor.messageType == SimpMessageType.CONNECT) {
//                    userRegistry.onApplicationEvent(SessionConnectedEvent(this, message, yourAuth));
//                } else if (accessor.messageType == SimpMessageType.SUBSCRIBE) {
//                    userRegistry.onApplicationEvent(SessionSubscribeEvent(this, message, yourAuth));
//                } else if (accessor.messageType == SimpMessageType.UNSUBSCRIBE) {
//                    userRegistry.onApplicationEvent(SessionUnsubscribeEvent(this, message, yourAuth));
//                } else if (accessor.messageType == SimpMessageType.DISCONNECT) {
//                    userRegistry.onApplicationEvent(SessionDisconnectEvent(this, message, accessor.sessionId, CloseStatus.NORMAL));
//                }
//
//                accessor.setUser(yourAuth);
//
//                // not documented anywhere but necessary otherwise NPE in StompSubProtocolHandler!
//                accessor.setLeaveMutable(true);
//                return MessageBuilder.createMessage(message.payload, accessor.messageHeaders);
//            }
//        })
    }
}
