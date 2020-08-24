package com.feed_grabber.core.responseDeadline.exceptions;

public class DeadlineExpiredException extends Exception {
    public DeadlineExpiredException(String dateTime) {
        super("This request expired at " + dateTime);
    }
}
