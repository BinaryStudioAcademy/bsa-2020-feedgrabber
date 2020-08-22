package com.feed_grabber.event_processor.report.model

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id

data class Report (
        @Id
        val id: ObjectId = ObjectId.get()
)
