package com.feed_grabber.core.auth.exceptions;

public class WrongCredentialsException extends RuntimeException {
    public WrongCredentialsException(String msg) {
        super(msg);
    }
}
