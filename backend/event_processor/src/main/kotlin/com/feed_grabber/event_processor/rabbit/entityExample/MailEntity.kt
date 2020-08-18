package com.feed_grabber.event_processor.rabbit.entityExample

import lombok.AllArgsConstructor
import lombok.Data

@AllArgsConstructor
@Data
class MailEntity {
    private val type: MailType = MailType.REGISTER
    private val message: String = ""
    private val emailTo: String = ""

    fun getType(): MailType {
        return this.type;
    }

    fun getMessage(): String {
        return this.message;
    }

    fun getEmailTo(): String {
        return this.emailTo;
    }

}
