package com.feed_grabber.core.responseAnswer.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class ResponseAnswerNotFoundException extends NotFoundException {
    public ResponseAnswerNotFoundException(String message) {
        super(message);
    }

    public ResponseAnswerNotFoundException() {
        super("Response Answer Not Found");
    }
}
