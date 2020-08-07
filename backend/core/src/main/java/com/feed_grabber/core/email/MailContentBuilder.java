package com.feed_grabber.core.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailContentBuilder {
    private final TemplateEngine templateEngine;

    @Autowired
    public MailContentBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String buildInviteHtmlForm(String link) {
        Context context = new Context();
        context.setVariable("link", link);
        return templateEngine.process("inviteLinkTemplate/index", context);
    }
}
