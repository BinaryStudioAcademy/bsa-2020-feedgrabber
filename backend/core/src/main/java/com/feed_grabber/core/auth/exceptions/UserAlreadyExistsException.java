package com.feed_grabber.core.auth.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(){
        super("User with such username or email already exists");
    }
}
