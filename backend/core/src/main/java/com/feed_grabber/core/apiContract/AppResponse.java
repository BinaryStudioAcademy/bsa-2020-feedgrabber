package com.feed_grabber.core.apiContract;

public class AppResponse<T> {
    public final T data;
    public final String error;

    public AppResponse(T data) {
        this.data = data;
        this.error = null;
    }

    public AppResponse(Exception error) {
        this.data = null;
        this.error = error.getMessage();
    }

    public AppResponse(T data, Exception error) {
        this.data = data;
        this.error = error.getMessage();
    }

}
