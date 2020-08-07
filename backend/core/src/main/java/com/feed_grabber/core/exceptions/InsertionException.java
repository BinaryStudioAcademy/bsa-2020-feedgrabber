package com.feed_grabber.core.exceptions;

public class InsertionException extends RuntimeException {
    public InsertionException(String entity) {
        super("Failed inserting " + entity);
    }
}
