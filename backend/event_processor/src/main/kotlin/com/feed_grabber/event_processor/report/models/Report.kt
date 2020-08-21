package com.feed_grabber.event_processor.report.excel.model

import java.time.LocalDateTime

data class Report(
    val questionnaire: Questionnaire,
    val requestCreationDate: LocalDateTime,
    val requestExpirationDate: LocalDateTime,
    val requestMaker: User,
    val responses: List<Response>,
    val targetUser: User
)