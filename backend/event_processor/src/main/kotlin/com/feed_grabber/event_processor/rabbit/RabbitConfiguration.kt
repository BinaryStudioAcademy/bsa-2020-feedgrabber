package com.feed_grabber.event_processor.rabbit

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.handler.annotation.support.DefaultMessageHandlerMethodFactory;
import org.springframework.messaging.handler.annotation.support.MessageHandlerMethodFactory;


@EnableRabbit
@Configuration
class RabbitConfiguration: RabbitListenerConfigurer {
    @Value("\${rabbitmq.exchange}")
    private val exchange: String? = null

    @Value("\${rabbitmq.routing-key}")
    private val routingKey: String? = null

    @Value("\${rabbitmq.queue}")
    private val queue: String? = null

    @Value("\${rabbitmq.queue.report}")
    private lateinit var reportQueue: String

    @Value("\${rabbitmq.queue.report.ppt}")
    private lateinit var pptReportQueue: String

    @Value("\${rabbitmq.routing-key-report-excel}")
    private val reportRoutingKey: String? = null

    // @Value("\${rabbitmq.routing-key-report-ppt}")
    // private val pptReportRoutingKey: String? = null;

    @Bean
    fun queue(): Queue? {
        return Queue(queue, true)
    }

    @Bean
    fun reportQueue(): Queue? {
        return Queue(reportQueue, true)
    }

//    @Bean
//    fun pptReportQueue(): Queue? {
//        return Queue(pptReportQueue, true)
//    }

    @Bean
    fun exchange(): TopicExchange? {
        return TopicExchange(exchange)
    }

    @Bean
    fun binding(queue: Queue?, exchange: TopicExchange?): Binding? {
        return BindingBuilder.bind(queue).to(exchange).with(routingKey)
    }

//    @Bean
//    fun pptReportQueueBinding(pptReportQueue: Queue?, exchange: TopicExchange?): Binding? {
//        return BindingBuilder.bind(pptReportQueue).to(exchange).with(pptReportRoutingKey)
//    }

    @Bean
    fun reportQueueBinding(reportQueue: Queue?, exchange: TopicExchange?): Binding? {
        return BindingBuilder.bind(reportQueue).to(exchange).with(reportRoutingKey)
    }

    @Bean
    fun rabbitTemplate(connectionFactory: ConnectionFactory?): RabbitTemplate? {
        val rabbitTemplate = connectionFactory?.let { RabbitTemplate(it) }
        if (rabbitTemplate != null) {
            rabbitTemplate.messageConverter = producerJackson2MessageConverter()!!
        }
        return rabbitTemplate
    }

    override fun configureRabbitListeners(registrar: RabbitListenerEndpointRegistrar?) {
        messageHandlerMethodFactory()?.let {
            registrar?.setMessageHandlerMethodFactory(it)
        }
    }
    @Bean
    fun messageHandlerMethodFactory(): MessageHandlerMethodFactory? {
        val messageHandlerMethodFactory = DefaultMessageHandlerMethodFactory()
        messageHandlerMethodFactory.setMessageConverter(consumerJackson2MessageConverter()!!)
        return messageHandlerMethodFactory
    }

    @Bean
    fun consumerJackson2MessageConverter(): MappingJackson2MessageConverter? {
        return MappingJackson2MessageConverter()
    }

    @Bean
    fun producerJackson2MessageConverter(): Jackson2JsonMessageConverter? {
        return Jackson2JsonMessageConverter()
    }
}
