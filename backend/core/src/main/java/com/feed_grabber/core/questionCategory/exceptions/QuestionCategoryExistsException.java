package com.feed_grabber.core.questionCategory.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;

public class QuestionCategoryExistsException extends AlreadyExistsException {
    public QuestionCategoryExistsException() {
        super("Question category with such company and title already exists");
    }
}
