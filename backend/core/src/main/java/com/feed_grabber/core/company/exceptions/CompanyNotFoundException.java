package com.feed_grabber.core.company.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class CompanyNotFoundException extends NotFoundException {
    public CompanyNotFoundException() {
        super("Company not found");
    }
}
