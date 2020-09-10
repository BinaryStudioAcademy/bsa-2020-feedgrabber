package com.feed_grabber.core.sections.exception;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;

public class SectionNotFoundException extends NotFoundException {
    public SectionNotFoundException() {super(Translator.toLocale("section_not_found"));}
}
