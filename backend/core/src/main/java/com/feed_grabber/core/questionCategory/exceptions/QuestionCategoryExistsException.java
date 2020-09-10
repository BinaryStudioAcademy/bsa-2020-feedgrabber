package com.feed_grabber.core.questionCategory.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.localization.Translator;

public class QuestionCategoryExistsException extends AlreadyExistsException {
    public QuestionCategoryExistsException() {
        super(Translator.toLocale("question_exception"));
    }
}
