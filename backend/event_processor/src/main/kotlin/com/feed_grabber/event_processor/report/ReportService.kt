package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.*
import com.feed_grabber.event_processor.report.dto.QuestionTypes.*
import com.feed_grabber.event_processor.report.dto.answervalues.*
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.*

@Service
class ReportService {
    fun parseQuestion(dto: QuestionResponseDto): Any {
        dto.apply {
            return when (type) {
                CHECKBOX -> CheckBoxValue(
                        value.get("selected").asIterable().map { it.asText() },
                        value.get("other")?.asText()
                )
                RADIO -> RadioValue(
                        value.get("selected").asText(),
                        value.get("other")?.asText()
                )
                FILE_UPLOAD -> FileValue(value.asIterable().map { it.asText() })
                FREE_TEXT -> FreeTextValue(value.asText())
                SCALE -> ScaleValue(value.asInt())
                DATE -> DateValue(Date(value.asText()))
            }
        }
    }

    @Suppress("UNCHECKED_CAST")
    fun getDataForReport(requestId: UUID) {
        val res = khttp.get("http://localhost:5000/api/report?requestId=$requestId").jsonObject
//        val dto = DataForReport(
//                res.get("questionnaire") as QuestionnaireDto,
//                res.get("requestCreationDate") as LocalDateTime,
//                res.get("requestExpirationDate") as LocalDateTime,
//                res.get("requestMaker") as UserDto,
//                res.get("responses") as List<ResponseDto>,
//                res.get("targetUser") as UserDto
//        )
//        println(dto)
    }
}
