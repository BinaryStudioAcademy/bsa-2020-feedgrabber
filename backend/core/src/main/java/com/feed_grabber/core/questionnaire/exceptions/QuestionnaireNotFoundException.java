package com.feed_grabber.core.questionnaire.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class QuestionnaireNotFoundException extends NotFoundException {
    public QuestionnaireNotFoundException() {
        super("Questionnaire not found");
    }
}
