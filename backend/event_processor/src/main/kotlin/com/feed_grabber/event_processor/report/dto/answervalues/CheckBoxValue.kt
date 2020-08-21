package com.feed_grabber.event_processor.report.dto.answervalues

data class CheckBoxValue(
        val selected: List<Int>,
        val other: String?
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as CheckBoxValue

        if (!selected.contentEquals(other.selected)) return false
        if (other != other.other) return false

        return true
    }

    override fun hashCode(): Int {
        var result = selected.contentHashCode()
        result = 31 * result + other.hashCode()
        return result
    }
}

