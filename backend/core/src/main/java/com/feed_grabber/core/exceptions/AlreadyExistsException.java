package com.feed_grabber.core.exceptions;

public class AlreadyExistsException extends Exception {
    public AlreadyExistsException(String message) {
        super(message);
    }

    public AlreadyExistsException() {
        super("Already Exists");
    }
}
