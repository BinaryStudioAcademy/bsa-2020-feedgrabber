package com.feed_grabber.core.company.exceptions;

import com.feed_grabber.core.auth.exceptions.InsertionException;
import com.feed_grabber.core.auth.exceptions.WrongCredentialsException;

public class WrongCompanyNameException extends InsertionException {
    public WrongCompanyNameException(String message) {
        super(message);
    }
}
