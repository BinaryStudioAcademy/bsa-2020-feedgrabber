package com.feed_grabber.event_processor.report.dto

import java.util.*

data class QuestionnaireDto(
        val companyName: String,
        val id: UUID,
        val questions: List<QuestionDto>,
        val title: String
)
