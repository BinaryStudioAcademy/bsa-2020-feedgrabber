package com.feed_grabber.core.response.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class ResponseNotFoundException extends NotFoundException {
    public ResponseNotFoundException() { super("Response not found"); }
}
