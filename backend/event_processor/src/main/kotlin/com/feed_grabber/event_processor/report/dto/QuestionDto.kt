package com.feed_grabber.event_processor.report.dto

import java.util.*

data class QuestionDto(
        val id: UUID,
        val name: String,
        val categoryTitle: String,
        val details: String,
        val type: QuestionTypes
)
