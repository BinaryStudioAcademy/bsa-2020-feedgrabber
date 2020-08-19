package com.feed_grabber.core.company.exceptions;

import com.feed_grabber.core.auth.exceptions.WrongCredentialsException;

public class WrongCompanyNameException extends Exception {
    public WrongCompanyNameException(String message) {
        super(message);
    }
}
