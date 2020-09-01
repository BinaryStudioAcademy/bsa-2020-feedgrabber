package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.DataForReport
import com.feed_grabber.event_processor.report.dto.FrontendReportData
import com.feed_grabber.event_processor.report.excel.ExcelReportGenerator
import com.feed_grabber.event_processor.report.ppt.PowerPointReport
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/ep/report")
class ReportController(val service: ReportService, val excel: ExcelReportGenerator, val pp: PowerPointReport) {
    @GetMapping("/{requestId}")
    fun getReport(@PathVariable requestId: UUID) = service.getFrontendData(requestId)

    @PostMapping
    fun generateReport(@RequestBody dto: DataForReport): FrontendReportData {
        val report = service.parseIncomingData(dto)

        report.powerPointLink = excel.generate(dto)
        report.excelLink = pp.create(report)

        val savedReport = service.saveReport(report)
        return service.reportToDto(savedReport)
    }

    @ExceptionHandler(value = [(EmptyResultDataAccessException::class)])
    fun handleUserAlreadyExists(ex: EmptyResultDataAccessException) = ResponseEntity(ex.message, HttpStatus.BAD_REQUEST)
}
