package com.feed_grabber.core.search.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PagedResponseDto<T> {
    private List<T> objects;
    private Long size;
}
