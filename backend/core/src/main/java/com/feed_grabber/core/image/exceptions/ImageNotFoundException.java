package com.feed_grabber.core.image.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class ImageNotFoundException extends NotFoundException {
    public ImageNotFoundException(String message) {
        super(message);
    }
    public ImageNotFoundException() {
        super("Image Not Found");
    }
}
