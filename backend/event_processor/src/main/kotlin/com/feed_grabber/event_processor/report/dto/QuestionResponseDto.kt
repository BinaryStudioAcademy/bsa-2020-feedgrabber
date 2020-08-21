package com.feed_grabber.event_processor.report.dto

import com.fasterxml.jackson.databind.JsonNode
import java.util.*

data class QuestionResponseDto(
        val questionId: UUID,
        val type: QuestionTypes,
        val value: JsonNode
)
