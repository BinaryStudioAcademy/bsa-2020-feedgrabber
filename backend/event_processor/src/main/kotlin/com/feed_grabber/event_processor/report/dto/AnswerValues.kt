package com.feed_grabber.event_processor.report.dto

import java.time.LocalDate
sealed class AnswerValues

data class ScaleValue(val number: Int) : AnswerValues()

data class RadioValue(val selected: String?, val other: String?) : AnswerValues()

data class FreeTextValue(val text: String) : AnswerValues()

data class FileValue(val urls: List<String>) : AnswerValues()

data class DateValue(val date: LocalDate) : AnswerValues()

data class CheckBoxValue(val selected: List<String>?, val other: String?) : AnswerValues()
