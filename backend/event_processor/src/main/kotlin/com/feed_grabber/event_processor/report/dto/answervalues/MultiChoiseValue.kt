package com.feed_grabber.event_processor.report.dto.answervalues

data class MultiChoiseValue(
        val selected: List<Int>,
        val other: String?
) {
}

