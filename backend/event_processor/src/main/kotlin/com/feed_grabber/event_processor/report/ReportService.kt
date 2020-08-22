package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.QuestionResponseDto
import com.feed_grabber.event_processor.report.dto.QuestionTypes.*
import com.feed_grabber.event_processor.report.dto.answervalues.*
import org.springframework.stereotype.Service
import java.util.*

@Service
class ReportService {
    fun parseQuestion(dto: QuestionResponseDto): Any {
        dto.apply {
            return when (type) {
                CHECKBOX -> CheckBoxValue(
                        value.get("selected").asIterable().map { it.asInt() },
                        value.get("other")?.asText()
                )
                RADIO -> RadioValue(
                        value.get("selected").asInt(),
                        value.get("other")?.asText()
                )
                FILE_UPLOAD -> FileValue(value.asIterable().map { it.asText() })
                FREE_TEXT -> FreeTextValue(value.asText())
                SCALE -> ScaleValue(value.asInt())
                DATE -> DateValue(Date(value.asText()))
            }
        }
    }

    fun getDataForReport() {
        khttp.get("localhost:5000/api/")
    }
}
