package com.feed_grabber.core.response;

import java.util.List;

public class DataList<T> {
    public List<T> items;
    public Long total;
    public Integer page;
    public Integer size;

    public DataList(List<T> items, Long total, Integer page, Integer size) {
        this.items = items;
        this.total = total;
        this.page = page;
        this.size = size;
    }
}
