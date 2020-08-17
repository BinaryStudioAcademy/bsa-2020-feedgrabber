package com.feed_grabber.event_processor.rabbit.entityExample

import lombok.Data
import java.io.Serializable
import java.util.*

@Data
class PostEntity: Serializable{
    var entityID: UUID? = null
    var type: EntityType? = null
}