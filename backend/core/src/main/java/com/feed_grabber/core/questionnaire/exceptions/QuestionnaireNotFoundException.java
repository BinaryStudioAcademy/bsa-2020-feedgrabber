package com.feed_grabber.core.questionnaire.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;

public class QuestionnaireNotFoundException extends NotFoundException {
    public QuestionnaireNotFoundException() {
        super(Translator.toLocale("questionnaire_not_found"));
    }
}
