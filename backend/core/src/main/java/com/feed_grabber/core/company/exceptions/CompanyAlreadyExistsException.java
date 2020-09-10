package com.feed_grabber.core.company.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.localization.Translator;

public class CompanyAlreadyExistsException extends AlreadyExistsException {
    public CompanyAlreadyExistsException() {
        super(Translator.toLocale("company_exists"));
    }
}
