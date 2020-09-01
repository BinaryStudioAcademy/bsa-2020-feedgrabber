package com.feed_grabber.event_processor.report.dto

import java.util.*

data class ReportFileCreationDto(val requestId: UUID, val link: String, val key: String)
