package com.feed_grabber.event_processor.report.excel

import com.feed_grabber.event_processor.report.ReportApiHelper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service

class ExcelReportCreator(@Autowired private val apiHelper: ReportApiHelper) {

    fun create(requestId: UUID) {
        var report = apiHelper.getReportByRequestId(requestId)
        //TODO: process report entity
    }
}
