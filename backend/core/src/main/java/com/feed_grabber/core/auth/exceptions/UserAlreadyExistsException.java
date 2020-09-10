package com.feed_grabber.core.auth.exceptions;

import com.feed_grabber.core.localization.Translator;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException() {
        super(Translator.toLocale("user_exists"));
    }
}
