package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.*
import com.feed_grabber.event_processor.report.dto.QuestionTypes.*
import com.feed_grabber.event_processor.report.model.*
import org.springframework.stereotype.Service
import java.util.*

@Service
class ReportService {
    fun parseQuestion(dto: QuestionResponseDto): AnswerValues {
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

    fun parseIncomingData(dto: DataForReport): Report {
        val map = HashMap<UUID, MutableList<Pair<AnswerValues, UserDto>>>()

        dto.responses.forEach { r ->
            r.payloadList?.forEach {
                map.getOrPut(it.questionId) { mutableListOf() }.add(Pair(parseQuestion(it), r.user))
            }
        }
        val questions = dto.questionnaire.questions.map {
            QuestionDB(it.id, it.name, it.categoryTitle, it.type, parseAnswers(map[it.id]))
        }

        dto.apply {
            return Report(requestId, questions, questionnaire,
                    requestCreationDate, requestExpirationDate,
                    requestMaker, targetUser, "", "")
        }

    }

    @Suppress("UNCHECKED_CAST")
    fun parseAnswers(answers: MutableList<Pair<AnswerValues, UserDto>>?): QuestionAnswersDB? =
            when (answers?.get(0)?.first) {
                is FreeTextValue -> {
                    QAWithValue().apply {
                        for (a in answers as List<Pair<FreeTextValue, UserDto>>)
                            this.values[a.second] = a.first.text
                    }
                }
                is DateValue -> {
                    QAWithValue().apply {
                        for (a in answers as List<Pair<DateValue, UserDto>>)
                            this.values[a.second] = a.first.date.toString()
                    }
                }
                is ScaleValue -> {
                    QAWithValue().apply {
                        for (a in answers as List<Pair<ScaleValue, UserDto>>)
                            this.values[a.second] = a.first.number.toString()
                    }
                }
                is FileValue -> {
                    QAWithValues().apply {
                        for (a in answers as List<Pair<FileValue, UserDto>>)
                            this.values[a.second] = a.first.urls
                    }
                }
                is CheckBoxValue -> {
                    QAWithOptions().apply {
                        for (a in answers as List<Pair<CheckBoxValue, UserDto>>) {
                            this.options[a.second] = a.first.selected
                            this.other.getOrPut(a.first.other) { mutableListOf() }.add(a.second)
                        }
                    }
                }

                is RadioValue -> {
                    QAWithOption().apply {
                        for (a in answers as List<Pair<RadioValue, UserDto>>) {
                            this.options[a.second] = a.first.selected
                            this.other.getOrPut(a.first.other) { mutableListOf() }.add(a.second)
                        }
                    }
                }
                else -> null
            }
}

