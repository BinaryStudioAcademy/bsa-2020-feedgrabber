package com.feed_grabber.core.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class WrongCredentialsException extends RuntimeException {
    public WrongCredentialsException(String str) {
        super(str);
    }
}
