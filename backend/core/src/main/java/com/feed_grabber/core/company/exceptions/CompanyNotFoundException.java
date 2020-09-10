package com.feed_grabber.core.company.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;

public class CompanyNotFoundException extends NotFoundException {
    public CompanyNotFoundException() {
        super(Translator.toLocale("company_not_found"));
    }
}
