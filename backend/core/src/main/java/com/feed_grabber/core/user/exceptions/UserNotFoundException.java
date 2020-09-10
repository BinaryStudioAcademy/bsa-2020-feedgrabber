package com.feed_grabber.core.user.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;

public class UserNotFoundException extends NotFoundException {
    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException() {
        super(Translator.toLocale("user_not_found"));
    }
}
