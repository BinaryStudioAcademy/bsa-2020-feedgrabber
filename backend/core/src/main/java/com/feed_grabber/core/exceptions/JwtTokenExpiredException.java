package com.feed_grabber.core.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "JWT token expired")
public class JwtTokenExpiredException extends Exception {
    public JwtTokenExpiredException(){
        super("JWT token expired");
    }
}
