package com.feed_grabber.core.question.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;

public class QuestionNotFoundException extends NotFoundException {
    public QuestionNotFoundException() {
        super(Translator.toLocale("question_not_found"));
    }
}
