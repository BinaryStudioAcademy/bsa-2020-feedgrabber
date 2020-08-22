package com.feed_grabber.event_processor.report

import com.feed_grabber.event_processor.report.model.Report
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository

interface ReportRepository : MongoRepository<Report, String> {
    fun findOneById(id: ObjectId): Report
}

