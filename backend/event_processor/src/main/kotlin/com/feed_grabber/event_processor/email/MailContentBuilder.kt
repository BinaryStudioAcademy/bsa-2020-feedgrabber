package com.feed_grabber.event_processor.email;

import com.sendgrid.helpers.mail.objects.Content
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.thymeleaf.TemplateEngine
import org.thymeleaf.context.Context

@Service
class MailContentBuilder(
        @Autowired val templateEngine: TemplateEngine
) {

    fun buildAccountActivationMail(link: String): Content {
        val context = Context()
        context.setVariable("link", link)
        return Content("text/html", templateEngine.process("activate_account", context))
    }

}
