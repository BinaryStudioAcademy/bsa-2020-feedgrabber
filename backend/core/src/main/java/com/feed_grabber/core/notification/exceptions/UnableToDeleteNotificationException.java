package com.feed_grabber.core.notification.exceptions;

public class UnableToDeleteNotificationException extends Exception{
    public UnableToDeleteNotificationException(String message) {
        super(message);
    }
    public UnableToDeleteNotificationException() {
        super("Unable to delete notification");
    }
}
