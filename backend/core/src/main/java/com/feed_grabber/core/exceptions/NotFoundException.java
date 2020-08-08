package com.feed_grabber.core.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class NotFoundException extends Exception{
    public NotFoundException(String message) {
        super(message);
    }
    public NotFoundException() {
        super("Not Found");
    }
}
