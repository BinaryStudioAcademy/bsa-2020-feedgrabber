package com.feed_grabber.core.response;

import org.springframework.http.HttpStatus;

public class AppResponse<T> {
    public final T data;
    public final String error;
    public final HttpStatus httpStatus;

    public AppResponse(T data, HttpStatus httpStatus) {
        this.data = data;
        this.error = null;
        this.httpStatus = httpStatus;
    }

    public AppResponse(Exception error, HttpStatus httpStatus) {
        this.data = null;
        this.error = error.getMessage();
        this.httpStatus = httpStatus;
    }

    public AppResponse(T data, Exception error, HttpStatus httpStatus) {
        this.data = data;
        this.error = error.getMessage();
        this.httpStatus = httpStatus;
    }

}
