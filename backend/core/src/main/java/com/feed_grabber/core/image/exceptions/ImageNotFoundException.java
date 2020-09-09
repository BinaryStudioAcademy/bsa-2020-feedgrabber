package com.feed_grabber.core.image.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;

public class ImageNotFoundException extends NotFoundException {
    public ImageNotFoundException(String message) {
        super(message);
    }
    public ImageNotFoundException() {
        super(Translator.toLocale("image_not_found"));
    }
}
