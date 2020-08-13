package com.feed_grabber.core.user.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class UserNotFoundException extends NotFoundException {
    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException() {
        super("User Not Found");
    }
}
