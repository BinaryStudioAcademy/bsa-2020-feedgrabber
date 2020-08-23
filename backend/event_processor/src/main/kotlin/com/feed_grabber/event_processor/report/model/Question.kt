package com.feed_grabber.event_processor.report.model

import com.feed_grabber.event_processor.report.dto.QuestionTypes
import java.util.*

sealed class QuestionAnswersDB

data class QAWithOptions(
        val options: MutableMap<UUID, List<String>> = mutableMapOf(),
        val other: MutableMap<String?, MutableList<UUID>> = mutableMapOf()
) : QuestionAnswersDB()

data class QAWithOption(
        val options: MutableMap<UUID, String> = mutableMapOf(),
        val other: MutableMap<String?, MutableList<UUID>> = mutableMapOf()
) : QuestionAnswersDB()

data class QAWithValue(
        val values: MutableMap<UUID, String> = mutableMapOf()
) : QuestionAnswersDB()

data class QAWithValues(
        val values: MutableMap<UUID, List<String>> = mutableMapOf()
) : QuestionAnswersDB()

data class QuestionDB(
        val id: UUID,
        val title: String,
        val categoryTitle: String,
        val type: QuestionTypes,
        val answers: QuestionAnswersDB?
)
