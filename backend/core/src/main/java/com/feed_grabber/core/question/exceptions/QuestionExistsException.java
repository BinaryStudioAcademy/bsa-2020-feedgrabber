package com.feed_grabber.core.question.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.localization.Translator;

public class QuestionExistsException extends AlreadyExistsException {
    public QuestionExistsException() {
        super(Translator.toLocale("question_exception"));
    }
}
