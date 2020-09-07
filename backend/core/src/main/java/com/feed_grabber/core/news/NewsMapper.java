package com.feed_grabber.core.news;

import com.feed_grabber.core.news.dto.NewsCreateDto;
import com.feed_grabber.core.news.dto.NewsDetailsDto;
import com.feed_grabber.core.news.dto.NewsDto;
import com.feed_grabber.core.news.model.News;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;


@Mapper
public interface NewsMapper {
    NewsMapper MAPPER = Mappers.getMapper(NewsMapper.class);

    @Mapping(target = "commentsCount", expression = "java(news.getComments().size())")
    NewsDto newsToNewsDto(News news);

    @Mapping(target = "commentsCount", expression = "java(news.getComments().size())")
    NewsDetailsDto newsToNewsDetailsDto(News news);
}
