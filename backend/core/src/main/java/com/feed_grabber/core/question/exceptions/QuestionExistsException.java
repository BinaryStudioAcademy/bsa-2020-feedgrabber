package com.feed_grabber.core.question.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;

public class QuestionExistsException extends AlreadyExistsException {
    public QuestionExistsException() {
        super("Question with such text, questionnaire and category already exists");
    }
}
