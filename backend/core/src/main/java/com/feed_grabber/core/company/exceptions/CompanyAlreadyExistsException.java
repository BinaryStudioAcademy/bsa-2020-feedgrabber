package com.feed_grabber.core.company.exceptions;

public class CompanyAlreadyExistsException extends RuntimeException {
    public CompanyAlreadyExistsException() {
        super("Company with such name already exists");
    }
}
