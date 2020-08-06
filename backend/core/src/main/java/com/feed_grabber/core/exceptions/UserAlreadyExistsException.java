package com.feed_grabber.core.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "User with such identifiers already exists")
public class UserAlreadyExistsException extends RuntimeException {
}
