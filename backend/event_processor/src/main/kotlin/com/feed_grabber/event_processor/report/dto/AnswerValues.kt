package com.feed_grabber.event_processor.report.dto

import java.util.*

data class ScaleValue(val number: Int)

data class RadioValue(val selected: String, val other: String?)

data class MultiChoiseValue(val selected: List<Int>, val other: String?)

data class FreeTextValue(val text: String)

data class FileValue(val urls: List<String>)

data class DateValue(val date: Date)

data class CheckBoxValue(val selected: List<String>, val other: String?)