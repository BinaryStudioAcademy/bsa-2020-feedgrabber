package com.feed_grabber.event_processor.email;

import com.sendgrid.helpers.mail.objects.Content
import org.springframework.stereotype.Service;

@Service
class MailContentBuilder {

    fun buildInvitationMail(link: String): Content {
        return Content("text/plain", "Please, confirm the account.\n" +
                "Click on the link " + link + " .")
    }

}
