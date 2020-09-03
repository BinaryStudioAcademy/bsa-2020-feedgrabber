package com.feed_grabber.core.news;

import com.feed_grabber.core.news.dto.NewsCreateDto;
import com.feed_grabber.core.news.dto.NewsDto;
import com.feed_grabber.core.news.model.News;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;


@Mapper
public interface NewsMapper {
    NewsMapper MAPPER = Mappers.getMapper(NewsMapper.class);

    NewsDto newsToNewsDto(News news);
}
