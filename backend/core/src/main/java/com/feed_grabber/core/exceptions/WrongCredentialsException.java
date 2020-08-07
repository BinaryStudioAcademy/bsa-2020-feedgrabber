package com.feed_grabber.core.exceptions;

public class WrongCredentialsException extends RuntimeException {
    public WrongCredentialsException(String msg) {
        super(msg);
    }
}
