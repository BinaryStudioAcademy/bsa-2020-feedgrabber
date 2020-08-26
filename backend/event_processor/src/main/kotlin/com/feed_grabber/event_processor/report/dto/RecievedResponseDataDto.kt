package com.feed_grabber.event_processor.report.dto

import com.fasterxml.jackson.databind.JsonNode
import java.time.LocalDateTime
import java.util.*


data class DataForReport(
        val requestId: UUID,
        val questionnaire: QuestionnaireDto,
        val requestCreationDate: Date,
        val requestExpirationDate: Date?,
        val requestMaker: UserDto,
        val responses: List<ResponseDto>,
        val targetUser: UserDto?
)

data class ResponseDto(
        val answeredAt: Date?,
        val id: UUID,
        val payload: String?,
        var payloadList: List<QuestionResponseDto>?,
        val user: UserDto
)

data class QuestionResponseDto(
        val questionId: UUID,
        val type: QuestionTypes,
        val body: JsonNode
)

data class QuestionnaireDto(
        val companyName: String,
        val id: UUID,
        val questions: List<QuestionDto>,
        val title: String
)

data class QuestionDto(
        val id: UUID,
        val name: String,
        val categoryTitle: String,
        val details: String,
        val type: QuestionTypes
)

data class UserDto(
        val email: String,
        val id: UUID,
        val role: String,
        val username: String
)
