package com.feed_grabber.event_processor.report.dto

import java.util.*

data class ReportFilesResponseDto(
        val requestId: UUID,
        val excelReportLink: String?,
        val pptReportLink: String?)
