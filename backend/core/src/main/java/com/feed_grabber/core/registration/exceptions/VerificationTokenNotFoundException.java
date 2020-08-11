package com.feed_grabber.core.registration.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class VerificationTokenNotFoundException extends NotFoundException {
    public VerificationTokenNotFoundException(String token) {
        super("Verification Token Not Found. Token: " + token);
    }
}
