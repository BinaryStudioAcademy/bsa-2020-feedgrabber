package com.feed_grabber.event_processor.report.dto

import com.feed_grabber.event_processor.report.model.QuestionDB
import org.springframework.beans.factory.annotation.Value
import java.util.*

data class FrontendReportData(
        val questionnaireTitle: String,
        val questions: List<QuestionInfo>
)

data class OptionInfo(val title: String, val amount: Int)

data class QuestionInfo(
        val id: UUID,
        val title: String,
        val type: QuestionTypes,
        val answers: Int?,
        val data: QuestionReportData?
)

sealed class QuestionReportData

data class QuestionWithOptions(val options: List<OptionInfo>) : QuestionReportData()

data class QuestionWithValues(val values: List<String>) : QuestionReportData()

interface FrontProjection {
    fun getQuestions(): List<QuestionDB>

    @Value("#{target.questionnaire.title}")
    fun getQuestionnaireTitle(): String
}
