package com.feed_grabber.core.company.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;

public class CompanyAlreadyExistsException extends AlreadyExistsException {
    public CompanyAlreadyExistsException() {
        super("Company with such name already exists");
    }
}
