package com.feed_grabber.core.questionCategory.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;

public class QuestionCategoryNotFoundException extends NotFoundException {
    public QuestionCategoryNotFoundException() {
        super(Translator.toLocale("question_category_not_found"));
    }
}
