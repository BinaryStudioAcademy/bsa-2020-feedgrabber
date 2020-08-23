package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.*
import com.feed_grabber.event_processor.report.dto.QuestionTypes.*
import com.feed_grabber.event_processor.report.model.*
import org.springframework.stereotype.Service
import java.util.*

@Service
class ReportService(val repository: ReportRepository) {
    fun parseAndSaveReport(dto: DataForReport) = repository.save(parseIncomingData(dto))

    fun getFrontendData(requestId: UUID) = parseReportForFrontend(repository.findById(requestId))

    fun parseIncomingData(dto: DataForReport): Report {
        val map = HashMap<UUID, MutableList<Pair<AnswerValues, UUID>>>()

        dto.responses.forEach { r ->
            r.payloadList?.forEach {
                map.getOrPut(it.questionId) { mutableListOf() }.add(Pair(this.parseQuestion(it), r.user.id))
            }
        }
        val questions = dto.questionnaire.questions.map {
            val answers = this.parseAnswers(map[it.id])
            if (answers == null) null
            else QuestionDB(it.id, it.name, it.categoryTitle, it.type, answers)
        }
        dto.apply {
            return Report(requestId, questions.filterNotNull(), questionnaire,
                    requestCreationDate, requestExpirationDate,
                    requestMaker, targetUser, "", "")
        }
    }

    fun parseReportForFrontend(report: FrontProjection): FrontendReportData = FrontendReportData(
            report.getQuestionnaireTitle(),
            report.getQuestions().map {
                QuestionInfo(it.id, it.title, it.type,
                        countAnswers(it.type, it.answers),
                        mapAnswers(it.type, it.answers))
            })


    fun mapAnswers(type: QuestionTypes, dbAnswers: QuestionAnswersDB?): QuestionReportData? {
        if (dbAnswers == null) return null
        return when (type) {
            freeText, scale, date -> QuestionWithValues((dbAnswers as QAWithValue).values.values.toList())
            fileUpload -> QuestionWithValues((dbAnswers as QAWithValues).values.values.flatten())
            checkbox -> {
                val (options, other) = (dbAnswers as QAWithOptions)
                val list = options.values.flatten().groupingBy { it }.eachCount()
                        .toList().map { OptionInfo(it.first, it.second) }
                        .plus(OptionInfo("other", other.size))
                QuestionWithOptions(list)
            }
            radio -> {
                val (options, other) = (dbAnswers as QAWithOption)
                val list = options.values.groupingBy { it }.eachCount()
                        .toList().map { OptionInfo(it.first, it.second) }
                        .plus(OptionInfo("other", other.size))
                QuestionWithOptions(list)
            }
        }
    }

    fun countAnswers(type: QuestionTypes, dbAnswers: QuestionAnswersDB?): Int {
        if (dbAnswers == null) return 0
        return when (type) {
            freeText, scale, date -> (dbAnswers as QAWithValue).values.size
            fileUpload -> (dbAnswers as QAWithValues).values.size
            checkbox -> {
                val (options, other) = (dbAnswers as QAWithOptions)
                options.size + other.values.flatten().size
            }
            radio -> {
                val (options, other) = (dbAnswers as QAWithOption)
                options.size + other.values.flatten().size
            }
        }
    }

    fun parseQuestion(dto: QuestionResponseDto): AnswerValues {
        dto.apply {
            return when (type) {
                checkbox -> CheckBoxValue(
                        body.get("selected")?.asIterable()?.map { it.asText() },
                        body.get("other")?.asText()
                )
                radio -> RadioValue(
                        body.get("selected")?.asText(),
                        body.get("other")?.asText()
                )
                fileUpload -> FileValue(body.asIterable().map { it.asText() })
                freeText -> FreeTextValue(body.asText())
                scale -> ScaleValue(body.asInt())
                date -> DateValue(Date(body.asText()))
            }
        }
    }


    @Suppress("UNCHECKED_CAST")
    fun parseAnswers(answers: MutableList<Pair<AnswerValues, UUID>>?): QuestionAnswersDB? {
        if (answers == null) return null;
        return when (answers[0].first) {
            is FreeTextValue -> {
                QAWithValue().apply {
                    for (a in answers as List<Pair<FreeTextValue, UUID>>)
                        values[a.second] = a.first.text
                }
            }
            is DateValue -> {
                QAWithValue().apply {
                    for (a in answers as List<Pair<DateValue, UUID>>)
                        values[a.second] = a.first.date.toString()
                }
            }
            is ScaleValue -> {
                QAWithValue().apply {
                    for (a in answers as List<Pair<ScaleValue, UUID>>)
                        values[a.second] = a.first.number.toString()
                }
            }
            is FileValue -> {
                QAWithValues().apply {
                    for (a in answers as List<Pair<FileValue, UUID>>)
                        values[a.second] = a.first.urls
                }
            }
            is CheckBoxValue -> {
                QAWithOptions().apply {
                    for (a in answers as List<Pair<CheckBoxValue, UUID>>) {
                        if (a.first.selected != null) options[a.second] = a.first.selected!!
                        if (a.first.other != null) other.getOrPut(a.first.other!!) { mutableListOf() }.add(a.second)
                    }
                }
            }
            is RadioValue -> {
                QAWithOption().apply {
                    for (a in answers as List<Pair<RadioValue, UUID>>) {
                        if (a.first.selected != null) options[a.second] = a.first.selected!!
                        if (a.first.other != null) other.getOrPut(a.first.other!!) { mutableListOf() }.add(a.second)
                    }
                }
            }
        }
    }
}

