package com.feed_grabber.core.auth.exceptions;

import com.feed_grabber.core.localization.Translator;

public class InsertionException extends RuntimeException {
    public InsertionException(String entity) {
        super(Translator.toLocale("failed_inserting") + entity);
    }
}
