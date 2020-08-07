package com.feed_grabber.core.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    MailContentBuilder mailContentBuilder;

    private static final String NOREPLY_ADDRESS = "noreply@feedgrubber.com";

    public void sendInviteLink(String to, String link) {
        var htmlMessage = mailContentBuilder.buildInviteHtmlForm(link);
        sendMessage(to, "Confirm your email", htmlMessage, true);
    }

    public void sendMessage(String to, String subject, String message, boolean isHtml) {
        try {
            var mimeMessage = emailSender.createMimeMessage();
            var helper = new MimeMessageHelper(mimeMessage);
            helper.setFrom(NOREPLY_ADDRESS);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(message, isHtml);

            emailSender.send(mimeMessage);
        } catch (MailException | MessagingException exception) {
            exception.printStackTrace();
        }
    }
}
