package com.feed_grabber.event_processor.report.model

import com.feed_grabber.event_processor.report.dto.QuestionTypes
import com.feed_grabber.event_processor.report.dto.UserDto
import java.util.*

sealed class QuestionAnswersDB

data class QuestionAnswersWithOptions(
        val options: Map<String, List<UserDto>>,
        val other: Map<String, List<UserDto>>?
) : QuestionAnswersDB()

data class QuestionAnswersWithOutOptions(val values: Map<UserDto, String>) : QuestionAnswersDB()

data class QuestionDB(
        val id: UUID,
        val title: String,
        val categoryTitle: String,
        val type: QuestionTypes,
        val answers: QuestionAnswersDB
)
