package com.feed_grabber.core.news.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;

public class NewsNotFoundException extends NotFoundException {
    public NewsNotFoundException() {
        super(Translator.toLocale("news_not_found"));
    }
}
