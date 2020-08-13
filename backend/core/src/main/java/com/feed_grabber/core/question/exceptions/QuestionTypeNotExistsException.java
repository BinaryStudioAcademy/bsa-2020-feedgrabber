package com.feed_grabber.core.question.exceptions;

/**
 * @author Aleksandr Karpachov
 * @version 1.0
 * @since 13.08.2020
 */
public class QuestionTypeNotExistsException extends RuntimeException {
    public QuestionTypeNotExistsException(String msg) {
        super(msg);
    }
}
