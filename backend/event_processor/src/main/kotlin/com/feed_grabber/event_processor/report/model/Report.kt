package com.feed_grabber.event_processor.report.model

import com.feed_grabber.event_processor.report.dto.QuestionnaireDto
import com.feed_grabber.event_processor.report.dto.UserDto
import org.springframework.data.annotation.Id
import java.time.LocalDateTime
import java.util.*

data class Report(
        @Id
        val id: UUID,
        val questions: List<QuestionDB>?,
        val questionnaire: QuestionnaireDto,
        val requestCreationDate: Date,
        val requestExpirationDate: Date?,
        val requestMaker: UserDto,
        val targetUser: UserDto?,
        var excelLink: String,
        var powerPointLink: String
)
