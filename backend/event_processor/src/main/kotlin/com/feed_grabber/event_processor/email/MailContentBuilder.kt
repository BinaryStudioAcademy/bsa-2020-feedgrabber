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

    fun buildInvitationMail(link: String): Content {
        val context = Context()
        context.setVariable("link", link)
//        return Content("text/plain", "Please, confirm the account.\n" +
//                "Click on the link " + link + " .")
        println(templateEngine.process("invite", context))
        return Content("text/html", templateEngine.process("invite", context))
    }

}
