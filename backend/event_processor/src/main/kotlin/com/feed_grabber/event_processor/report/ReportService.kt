package com.feed_grabber.event_processor.report

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.feed_grabber.event_processor.report.dto.*
import com.feed_grabber.event_processor.report.dto.QuestionTypes.*
import com.feed_grabber.event_processor.report.model.*
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.util.*

@Service
class ReportService(val repository: ReportRepository, val JSON: ObjectMapper = jacksonObjectMapper()) {

    fun saveReport(report: Report) = repository.save(report)

    fun getFrontendData(requestId: UUID): FrontendReportData = projectionToDto(repository.getProjection(requestId))

    fun parseIncomingData(dto: DataForReport): Report {
        dto.responses.forEach { it.payloadList = it.payload?.let { p -> JSON.readValue(p) } }
        val map = HashMap<UUID, MutableList<Pair<AnswerValues, UUID>>>()

        dto.responses.forEach { r ->
            r.payloadList?.forEach {
                map.getOrPut(it.questionId) { mutableListOf() }.add(Pair(this.parseQuestion(it), r.user.id))
            }
        }
        val questions = dto.questionnaire.sections.map { it.questions }.flatten();

        val parsed = questions.map {
            val answers = this.parseAnswers(map[it.id])
            if (answers == null) null
            else QuestionDB(it.id, it.name, it.categoryTitle, it.type, answers)
        }
        dto.apply {
            return Report(requestId, parsed.filterNotNull(), QuestionnaireDB(questionnaire.companyName, questionnaire.id, questions, questionnaire.title),
                    requestCreationDate, requestExpirationDate,
                    requestMaker, targetUser, null, null)
        }
    }

    fun projectionToDto(report: FrontendProjection) = FrontendReportData(
            report.questionnaire,
            report.questions.map {
                QuestionInfo(it.id, it.title, it.type,
                        countAnswers(it.type, it.answers),
                        mapAnswers(it.type, it.answers))
            }, report.excelLink, report.powerPointLink)

    fun reportToDto(report: Report) = FrontendReportData(
            report.questionnaire,
            report.questions?.map {
                QuestionInfo(it.id, it.title, it.type,
                        countAnswers(it.type, it.answers),
                        mapAnswers(it.type, it.answers))
            }, report.excelLink, report.powerPointLink)


    fun mapAnswers(type: QuestionTypes, dbAnswers: QuestionAnswersDB?): QuestionReportData? {
        if (dbAnswers == null) return null
        return when (type) {
            freeText -> QuestionWithValues((dbAnswers as QAWithValue).values.values.toList())
            scale, date -> {
                val (options) = (dbAnswers as QAWithOptionNoOther)
                val list = options.values.groupingBy { it }.eachCount()
                        .toList().map { OptionInfo(it.first, it.second) }
                QuestionWithOptions(list)
            }
            fileUpload -> {
                val variable = (dbAnswers as QAWithValues).values.values.flatten()
                QuestionWithValues(variable)}
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
            freeText -> (dbAnswers as QAWithValue).values.size
            scale, date -> (dbAnswers as QAWithOptionNoOther).options.size
            fileUpload -> (dbAnswers as QAWithValues).values.size
            checkbox -> {
                val (options, other) = (dbAnswers as QAWithOptions)
                options.keys.plus(other.values.flatten()).size
            }
            radio -> {
                val (options, other) = (dbAnswers as QAWithOption)
                options.keys.plus(other.values.flatten()).size
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
                date -> DateValue(LocalDate.parse(body.asText()))
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
                QAWithOptionNoOther().apply {
                    for (a in answers as List<Pair<DateValue, UUID>>)
                        options[a.second] = a.first.date.toString()
                }
            }
            is ScaleValue -> {
                QAWithOptionNoOther().apply {
                    for (a in answers as List<Pair<ScaleValue, UUID>>)
                        options[a.second] = a.first.number.toString()
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

