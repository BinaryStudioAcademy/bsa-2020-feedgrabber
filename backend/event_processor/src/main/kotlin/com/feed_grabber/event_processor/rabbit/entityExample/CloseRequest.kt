package com.feed_grabber.event_processor.rabbit.entityExample

import java.util.*

class CloseRequest {
    private val requestId: UUID = UUID.randomUUID()
    private val closeDate: Date = Date()

    fun getRequestId(): UUID = requestId

    fun getCloseDate(): Date = closeDate
}