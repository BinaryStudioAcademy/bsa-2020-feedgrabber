package com.feed_grabber.event_processor.report.dto

import java.time.LocalDateTime
import java.util.*

data class DataForReport(
        val requestId: UUID,
        val questionnaire: QuestionnaireDto,
        val requestCreationDate: LocalDateTime,
        val requestExpirationDate: LocalDateTime?,
        val requestMaker: UserDto,
        val responses: List<ResponseDto>,
        val targetUser: UserDto?
)

