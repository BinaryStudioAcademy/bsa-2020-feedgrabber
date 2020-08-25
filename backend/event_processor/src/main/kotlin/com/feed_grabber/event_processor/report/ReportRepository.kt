package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.FrontProjection
import com.feed_grabber.event_processor.report.model.Report
import org.bson.types.ObjectId
import org.springframework.data.domain.Example
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.*

interface ReportRepository : MongoRepository<Report, String> {
    fun findById(id: UUID): FrontProjection
}

