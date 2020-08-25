package com.feed_grabber.event_processor.report.ppt

import org.apache.poi.xslf.usermodel.XMLSlideShow
import java.util.*

data class UserReport(val userId: UUID, val report: XMLSlideShow)
