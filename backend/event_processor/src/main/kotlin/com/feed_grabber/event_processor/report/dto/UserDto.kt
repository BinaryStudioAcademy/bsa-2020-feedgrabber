package com.feed_grabber.event_processor.report.dto

import java.util.*

data class UserDto(
        val email: String,
        val id: UUID,
        val role: String,
        val username: String
)
