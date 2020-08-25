package com.feed_grabber.core.sections.exception;

import com.feed_grabber.core.exceptions.NotFoundException;

public class SectionNotFoundException extends NotFoundException {
    public SectionNotFoundException() {super("Section not found");}
}
