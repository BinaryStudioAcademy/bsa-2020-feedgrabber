package com.feed_grabber.core.questionnaire.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;

public class QuestionnaireExistsException extends AlreadyExistsException {
    public QuestionnaireExistsException() {
        super("Questionnaire with the same name exists or already deleted");
    }
}
