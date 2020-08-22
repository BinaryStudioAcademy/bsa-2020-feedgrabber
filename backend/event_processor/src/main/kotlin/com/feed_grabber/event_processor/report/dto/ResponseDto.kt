package com.feed_grabber.event_processor.report.dto

import java.time.LocalDateTime
import java.util.*

data class ResponseDto(
        val answeredAt: LocalDateTime?,
        val id: UUID,
        val payload: String?,
        var payloadList: List<QuestionResponseDto>?,
        val user: UserDto
)
