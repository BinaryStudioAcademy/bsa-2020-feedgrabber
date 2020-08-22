package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.QuestionResponseDto
import com.feed_grabber.event_processor.report.dto.QuestionTypes.*
import com.feed_grabber.event_processor.report.dto.answervalues.*
import java.util.*

class ReportService {
    fun parseQuestion(dto: QuestionResponseDto): Any =
            dto.apply {
                return when (type) {
                    checkbox -> CheckBoxValue(
                            body.get("selected").asIterable().map { it.asInt() },
                            body.get("other")?.asText()
                    )
                    radio -> RadioValue(
                            body.get("selected").asInt(),
                            body.get("other")?.asText()
                    )
                    fileUpload -> FileValue(body.asIterable().map { it.asText() })
                    freeText -> FreeTextValue(body.asText())
                    scale -> ScaleValue(body.asInt())
                    date -> DateValue(Date(body.asText()))
                }
            }
}
