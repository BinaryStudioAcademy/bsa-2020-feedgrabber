package com.feed_grabber.core.response;

public class AppResponse<T> {
    public final T data;
    public final Exception error;

    public AppResponse(T data) {
        this.data = data;
        this.error = null;
    }

    public AppResponse(T data, Exception error) {
        this.data = data;
        this.error = error;
    }
}
