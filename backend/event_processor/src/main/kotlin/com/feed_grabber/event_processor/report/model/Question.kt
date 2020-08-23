package com.feed_grabber.event_processor.report.model

import com.feed_grabber.event_processor.report.dto.QuestionTypes
import com.feed_grabber.event_processor.report.dto.UserDto
import java.util.*

sealed class QuestionAnswersDB

data class QAWithOptions(
        val options: MutableMap<UserDto, List<String>> = mutableMapOf(),
        val other: MutableMap<String?, MutableList<UserDto>> = mutableMapOf()
) : QuestionAnswersDB()

data class QAWithOption(
        val options: MutableMap<UserDto, String> = mutableMapOf(),
        val other: MutableMap<String?, MutableList<UserDto>> = mutableMapOf()
) : QuestionAnswersDB()

data class QAWithValue(
        val values: MutableMap<UserDto, String> = mutableMapOf()
) : QuestionAnswersDB()

data class QAWithValues(
        val values: MutableMap<UserDto, List<String>> = mutableMapOf()
) : QuestionAnswersDB()

data class QuestionDB(
        val id: UUID,
        val title: String,
        val categoryTitle: String,
        val type: QuestionTypes,
        val answers: QuestionAnswersDB?
)
