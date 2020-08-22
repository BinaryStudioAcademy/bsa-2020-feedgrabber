package com.feed_grabber.event_processor.report.model

import com.feed_grabber.event_processor.report.dto.QuestionnaireDto
import com.feed_grabber.event_processor.report.dto.UserDto
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import java.time.LocalDateTime

data class Report (
        @Id
        val id: ObjectId = ObjectId.get(),
        val questions: List<QuestionDB>,
        val questionnaire: QuestionnaireDto,
        val requestCreationDate: LocalDateTime,
        val requestExpirationDate: LocalDateTime?,
        val requestMaker: UserDto,
        val targetUser: UserDto?,
        val excelLink: String,
        val powerPointLink: String
)
