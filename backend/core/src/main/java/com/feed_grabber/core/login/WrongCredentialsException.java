package com.feed_grabber.core.login;


public class WrongCredentialsException extends RuntimeException {
    public WrongCredentialsException(String msg) {
        super(msg);
    }
}
