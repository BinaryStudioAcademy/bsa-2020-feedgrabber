package com.feed_grabber.core.questionCategory.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class QuestionCategoryNotFoundException extends NotFoundException {
    public QuestionCategoryNotFoundException() {
        super("Question category not found");
    }
}
