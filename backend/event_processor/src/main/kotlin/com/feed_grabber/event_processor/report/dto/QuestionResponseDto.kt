package com.feed_grabber.event_processor.report.dto

import java.util.*

data class QuestionResponseDto(
        val questionId: UUID,
        val type: QuestionTypes,
        val value: Any
)
