package com.feed_grabber.event_processor.report.excel.model

import java.util.*

data class User(
        val email: String,
        val id: UUID,
        val role: String,
        val username: String
)