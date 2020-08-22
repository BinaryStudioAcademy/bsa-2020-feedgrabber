package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.*
import com.feed_grabber.event_processor.report.dto.QuestionTypes.*
import org.springframework.stereotype.Service
import java.util.*

@Service
class ReportService {
    fun parseQuestion(dto: QuestionResponseDto): Any {
        dto.apply {
            return when (type) {
                checkbox -> CheckBoxValue(
                        body.get("selected").asIterable().map { it.asText() },
                        body.get("other")?.asText()
                )
                radio -> RadioValue(
                        body.get("selected").asText(),
                        body.get("other")?.asText()
                )
                fileUpload -> FileValue(body.asIterable().map { it.asText() })
                freeText -> FreeTextValue(body.asText())
                scale -> ScaleValue(body.asInt())
                date -> DateValue(Date(body.asText()))
            }
        }
    }
}
