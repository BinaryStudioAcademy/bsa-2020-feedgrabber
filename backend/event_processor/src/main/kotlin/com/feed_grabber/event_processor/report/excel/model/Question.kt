package com.feed_grabber.event_processor.report.excel.model

import java.util.*

data class Question(
        val categoryTitle: String,
        val details: String,
        val id: UUID,
        val name: String,
        val type: String
)