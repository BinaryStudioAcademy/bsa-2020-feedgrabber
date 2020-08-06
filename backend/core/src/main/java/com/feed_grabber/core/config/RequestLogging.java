package com.feed_grabber.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@Configuration
public class RequestLogging {

    @Bean
    public CommonsRequestLoggingFilter logFilter() {
        var filter = new CommonsRequestLoggingFilter();

        filter.setIncludeQueryString(true);
        filter.setIncludePayload(true);
        filter.setMaxPayloadLength(10000);
        filter.setIncludeHeaders(true);
        filter.setHeaderPredicate(h -> h.equalsIgnoreCase("authorization"));
        filter.setBeforeMessagePrefix("REQUEST : [");
        filter.setAfterMessagePrefix("AFTER REQUEST : [");

        return filter;
    }
}
