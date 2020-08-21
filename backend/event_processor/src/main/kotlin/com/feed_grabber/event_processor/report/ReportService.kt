package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.QuestionResponseDto
import com.feed_grabber.event_processor.report.dto.QuestionTypes.*
import com.feed_grabber.event_processor.report.dto.answervalues.*
import java.util.*

class ReportService {
    fun parseQuestion(dto: QuestionResponseDto): Any =
            dto.apply {
                return when (type) {
                    FREE_TEXT -> FreeTextValue(value.get("text").asText())
                    CHECKBOX -> CheckBoxValue(
                            value.get("selected").asIterable().map { it.asInt() },
                            value.get("other")?.asText())
                    RADIO -> RadioValue(
                            value.get("selected").asInt(),
                            value.get("other")?.asText())
                    FILE_UPLOAD -> FileValue(value.get("urls").asIterable().map { it.asText() })
                    SCALE -> ScaleValue(value.get("number").asInt())
                    DATE -> DateValue(Date(value.get("date").asText()))
                }
            }
}
