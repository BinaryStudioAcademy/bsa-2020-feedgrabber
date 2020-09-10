package com.feed_grabber.core.localization;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

@Configuration
public class CustomLocaleResolver extends AcceptHeaderLocaleResolver {

    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        String header = request.getHeader("Language");
        return header == null || header.isEmpty()
                ? Locale.getDefault()
                : new Locale(header);
    }
}
