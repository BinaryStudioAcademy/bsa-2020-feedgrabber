package com.feed_grabber.event_processor.email

import com.feed_grabber.event_processor.rabbit.entityExample.MailEntity;
import com.feed_grabber.event_processor.rabbit.entityExample.MailType
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
        @Value("\${official-email}") val fromEmail: String
) {

    fun send(mail: Mail) {
        val sendGrid = SendGrid(sendGridApiKey)
        val request = Request()
        try {
            request.method = Method.POST
            request.endpoint = "mail/send"
            request.body = mail.build()
            val response = sendGrid.api(request)
            println(response.statusCode) // this code should be equal to 202
            println(response.body)
            println(response.headers)
        } catch (ex: IOException) {
            throw ex
        }
    }

    fun sendAccountActivationMail(activationLink: String, toEmailAddress: String) {
        val from = Email(fromEmail)
        val subject = "Confirm your email"
        val to = Email(toEmailAddress)
        val content = mailContentBuilder.buildAccountActivationMail(activationLink)
        val mail = Mail(from, subject, to, content)
        send(mail)
    }

    fun sendResetPasswordMail(activationLink: String, toEmailAddress: String) {
        val from = Email(fromEmail)
        val subject = "Reset password"
        val to = Email(toEmailAddress)
        val content = mailContentBuilder.buildResetPasswordMail(activationLink)
        val mail = Mail(from, subject, to, content)
        send(mail)
    }

    fun sendInvitationLinkMail(invitationLink: String, toEmailAddress: String) {
        val from = Email(fromEmail)
        val subject = "FeedGrabber Invitation"
        val to = Email(toEmailAddress)
        val content = mailContentBuilder.buildInvitationLinkMail(invitationLink)
        val mail = Mail(from, subject, to, content)
        send(mail)
    }

    fun sendNotificationMail(notification: String, toEmailAddress: String) {
        val from = Email(fromEmail)
        val subject = "FeedGrabber Notification"
        val to = Email(toEmailAddress)
        val content = mailContentBuilder.buildInvitationLinkMail(notification)
        val mail = Mail(from, subject, to, content)
        send(mail)
    }

    fun sendMail(mailEntity: MailEntity?) {
        if (mailEntity == null) {
            return
        }
        when (mailEntity.getType()) {
            MailType.REGISTER -> {
                sendAccountActivationMail(mailEntity.getMessage(), mailEntity.getEmailTo());
            }
            MailType.RESET -> {
                sendResetPasswordMail(mailEntity.getMessage(), mailEntity.getEmailTo());
            }
            MailType.INVITE -> {
                sendInvitationLinkMail(mailEntity.getMessage(), mailEntity.getEmailTo())
            }
            MailType.NOTIFY -> {
                sendNotificationMail(mailEntity.getMessage(), mailEntity.getEmailTo())
            }
        }
    }

}
