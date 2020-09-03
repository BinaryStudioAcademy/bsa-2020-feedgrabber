package com.feed_grabber.core.news.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class NewsNotFoundException extends NotFoundException {
    public NewsNotFoundException() {
        super("News not found");
    }
}
