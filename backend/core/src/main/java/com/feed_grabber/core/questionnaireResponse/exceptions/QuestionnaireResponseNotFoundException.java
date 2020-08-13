package com.feed_grabber.core.questionnaireResponse.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class QuestionnaireResponseNotFoundException extends NotFoundException {
    public QuestionnaireResponseNotFoundException(String message) {
        super(message);
    }

    public QuestionnaireResponseNotFoundException() {
        super("Questionnaire Response Not Found");
    }
}
