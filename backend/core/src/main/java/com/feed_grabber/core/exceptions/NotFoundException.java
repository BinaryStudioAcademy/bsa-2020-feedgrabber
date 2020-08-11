package com.feed_grabber.core.exceptions;

public class NotFoundException extends Exception {
    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException() {
        super("Not Found");
    }
}
