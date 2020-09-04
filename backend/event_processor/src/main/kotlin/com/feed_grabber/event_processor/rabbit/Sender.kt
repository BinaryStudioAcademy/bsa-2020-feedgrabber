package com.feed_grabber.event_processor.rabbit

import com.feed_grabber.event_processor.report.dto.ReportFileCreationDto
import com.feed_grabber.event_processor.report.dto.ReportFilesResponseDto
import org.springframework.amqp.rabbit.core.RabbitTemplate

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

import java.util.UUID

@Component
class Sender {
    @Value("\${rabbitmq.exchange}")
    private val exchange: String? = null

    @Value("\${rabbitmq.routing-key-response}")
    private val routingKey: String? = null

    @Value("\${rabbitmq.routing-key-response-links}")
    private val linksResponseRoutingKey: String? = null

    @Value("\${rabbitmq.routing-key-request-close-receive}")
    private val closeRequestRoutingKey: String? = null

    @Autowired
    private val template: RabbitTemplate? = null

    fun send(text: String) {
        println(" [x] Sending...")
        template!!.convertAndSend(exchange!!, routingKey!!, text)
        println(" [x] Sent $text")
    }

    fun sendLinks(links: ReportFilesResponseDto) {
        println(" [x] Sending generated file links to backend")
        template!!.convertAndSend(exchange!!, linksResponseRoutingKey!!, links)
        println(" [x] Sent generated file links to backend")
    }

    fun closeRequestNow(requestId: UUID) {
        println(" [x] Sending requestId for closing request")
        template!!.convertAndSend(exchange!!, closeRequestRoutingKey!!, requestId)
        println(" [x] Sent requestId")
    }

}
