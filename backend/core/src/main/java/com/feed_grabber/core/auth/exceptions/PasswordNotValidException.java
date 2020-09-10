package com.feed_grabber.core.auth.exceptions;

public class PasswordNotValidException extends RuntimeException {
    public PasswordNotValidException(String message) {
        super(message);
    }
}
