package com.feed_grabber.event_processor.report.excel.model

import java.util.*

data class Questionnaire(
        val companyName: String,
        val id: UUID,
        val questions: List<Question>,
        val title: String
)