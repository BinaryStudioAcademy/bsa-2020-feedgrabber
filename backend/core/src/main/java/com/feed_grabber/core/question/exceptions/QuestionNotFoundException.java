package com.feed_grabber.core.question.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class QuestionNotFoundException extends NotFoundException {
    public QuestionNotFoundException() {
        super("Question Not Found");
    }
}
