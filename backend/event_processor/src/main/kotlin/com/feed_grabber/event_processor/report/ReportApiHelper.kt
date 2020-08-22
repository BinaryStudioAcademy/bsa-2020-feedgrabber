package com.feed_grabber.event_processor.report

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.feed_grabber.event_processor.report.dto.DataForReport
import com.feed_grabber.event_processor.report.dto.QuestionResponseDto
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject
import java.util.*

@Service
class ReportApiHelper {
    val JSON = jacksonObjectMapper()

    fun getReportByRequestId(requestId: UUID): DataForReport {
        var report = getReportById(requestId)
        report.responses.stream().forEach { r -> r.payloadList = JSON.readValue<List<QuestionResponseDto>>(r.payload?:r.payload.toString()) }
        return report
    }

    fun getReportById(requestId: UUID): DataForReport = RestTemplate().getForObject("http://localhost:5000/api/report?requestId=$requestId", DataForReport::class)

}
