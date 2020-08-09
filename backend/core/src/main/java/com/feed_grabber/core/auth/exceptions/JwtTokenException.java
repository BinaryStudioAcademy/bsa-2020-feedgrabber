package com.feed_grabber.core.auth.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "JWT token expired")
public class JwtTokenException extends RuntimeException {
    public JwtTokenException(String cause){
        super(cause);
    }
}
