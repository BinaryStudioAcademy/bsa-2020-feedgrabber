package com.feed_grabber.core.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class AppResponse<T> {
    public final T data;

    @JsonIgnoreProperties({"cause", "stackTrace", "suppressed"})
    public final Exception error;

    public AppResponse(T data) {
        this.data = data;
        this.error = null;
    }

    public AppResponse(Exception error) {
        this.data = null;
        this.error = error;
    }

    public AppResponse(T data, Exception error) {
        this.data = data;
        this.error = error;
    }

}
