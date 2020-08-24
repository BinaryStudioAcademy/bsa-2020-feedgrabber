package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.DataForReport
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/ep/report")
class ReportController(val service: ReportService) {
    @GetMapping("/{requestId}")
    fun getReport(@PathVariable("requestId") requestId: UUID) = service.getFrontendData(requestId)

    @PostMapping
    fun generateReport(@RequestBody dto: DataForReport) = service.parseReportForFrontend(service.parseAndSaveReport(dto))

    @ExceptionHandler(value = [(EmptyResultDataAccessException::class)])
    fun handleUserAlreadyExists(ex: EmptyResultDataAccessException) = ResponseEntity(ex.message, HttpStatus.BAD_REQUEST)
}
