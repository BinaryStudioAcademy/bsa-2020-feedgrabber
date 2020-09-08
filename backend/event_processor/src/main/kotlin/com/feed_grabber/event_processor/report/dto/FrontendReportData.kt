package com.feed_grabber.event_processor.report.dto

import com.feed_grabber.event_processor.report.model.QuestionDB
import org.springframework.beans.factory.annotation.Value
import java.util.*

data class FrontendReportData(
        val questionnaire: QuestionnaireDB?,
        val questions: List<QuestionInfo>?,
        val excelLink: ReportFileCreationDto?,
        val powerPointLink: ReportFileCreationDto?
)

data class OptionInfo(val title: String, val amount: Int)

data class QuestionInfo(
        val id: UUID,
        val title: String,
        val type: QuestionTypes,
        val answers: Int,
        val data: QuestionReportData?
)

sealed class QuestionReportData

data class QuestionWithOptions(val options: List<OptionInfo>) : QuestionReportData()

data class QuestionWithValues(val values: List<String>) : QuestionReportData()

data class FrontendProjection(val questions: List<QuestionDB>,
                              val questionnaire: QuestionnaireDB?,
                              val excelLink: ReportFileCreationDto?,
                              val powerPointLink: ReportFileCreationDto?)
