package com.feed_grabber.event_processor.report.excel.model

import java.time.LocalDateTime
import java.util.*

data class Response(
        val answeredAt: LocalDateTime,
        val id: UUID,
        val payload: Any,
        val user: User
)