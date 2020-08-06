package com.feed_grabber.core.exceptions;

public class VerificationTokenExpiredException extends Exception {
    public VerificationTokenExpiredException(String token) {
        super("Verification token expired. Token: " + token);
    }
}
