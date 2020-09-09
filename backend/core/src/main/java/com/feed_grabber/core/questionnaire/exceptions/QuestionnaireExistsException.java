package com.feed_grabber.core.questionnaire.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.localization.Translator;

public class QuestionnaireExistsException extends AlreadyExistsException {
    public QuestionnaireExistsException() {
        super(Translator.toLocale("questionnaire_exists"));
    }
}
