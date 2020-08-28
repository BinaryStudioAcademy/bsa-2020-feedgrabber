package com.feed_grabber.event_processor.report

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.feed_grabber.event_processor.report.dto.DataForReport
import com.feed_grabber.event_processor.report.dto.QuestionResponseDto
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject
import java.util.*

@Service
class ReportApiHelper(val JSON: ObjectMapper = jacksonObjectMapper()) {
    var URL = "http://localhost:5000/api/report?requestId="
    fun fetchReportData(requestId: UUID): DataForReport {
        val result: DataForReport = RestTemplate().getForObject(URL.plus(requestId), DataForReport::class)
        result.responses.forEach { t ->
            run {
                if (t.payload != "")
                    t.payloadList = t.payload?.let { p -> JSON.readValue(p) }
                else
                    t.payloadList = null;
            }
        }
        return result
    }

}
