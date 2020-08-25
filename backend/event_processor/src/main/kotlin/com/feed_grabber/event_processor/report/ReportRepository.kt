package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.dto.FrontendProjection
import com.feed_grabber.event_processor.report.model.Report
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import java.util.*

interface ReportRepository : MongoRepository<Report, String> {
    @Query(value="{id : ?0}")
    fun getProjection(id: UUID): FrontendProjection
}

