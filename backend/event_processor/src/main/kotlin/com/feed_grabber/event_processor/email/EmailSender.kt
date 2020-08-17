package com.feed_grabber.event_processor.email

import com.sendgrid.Method
import com.sendgrid.Request
import com.sendgrid.SendGrid
import com.sendgrid.helpers.mail.Mail
import com.sendgrid.helpers.mail.objects.Email
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.IOException

@Service
class EmailSender(
        @Autowired val mailContentBuilder: MailContentBuilder,
        @Value("\${send-grid-api-key}") val sendGridApiKey: String,
        @Value("\${official-email}") val fromEmail: String = "email"
) {

    fun send(mail: Mail) {
        println(sendGridApiKey)
        val sendGrid = SendGrid(sendGridApiKey)
        val request = Request()
        try {
            request.method = Method.POST
            request.endpoint = "mail/send"
            request.body = mail.build()
            val response = sendGrid.api(request)
            println(response.statusCode)
            println(response.body)
            println(response.headers)
        } catch (ex: IOException) {
            throw ex
        }
    }

    fun sendInvitation(invitationLink: String, toEmailAddress: String) {
        val from = Email(fromEmail)
        val subject = "Confirm your email"
        val to = Email(toEmailAddress)
        val content = mailContentBuilder.buildInvitationMail(invitationLink)
        val mail = Mail(from, subject, to, content)
        send(mail)
    }

}
