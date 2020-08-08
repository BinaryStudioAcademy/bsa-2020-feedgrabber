package com.feed_grabber.core.auth.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(){
        super("User with such username or email already exists");
    }
}
