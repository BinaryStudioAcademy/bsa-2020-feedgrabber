package com.feed_grabber.core.news;

import com.feed_grabber.core.comments.CommentMapper;
import com.feed_grabber.core.image.ImageMapper;
import com.feed_grabber.core.news.dto.NewsCreateDto;
import com.feed_grabber.core.news.dto.NewsDetailsDto;
import com.feed_grabber.core.news.dto.NewsDto;
import com.feed_grabber.core.news.model.News;
import com.feed_grabber.core.user.UserMapper;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;


@Mapper(uses = {UserMapper.class, ImageMapper.class, CommentMapper.class})
public interface NewsMapper {
    NewsMapper MAPPER = Mappers.getMapper(NewsMapper.class);

    @Mapping(target = "reactions", ignore = true)
    @Mapping(target = "commentsCount", expression = "java(news.getComments() == null ? 0 : news.getComments().size())")
    NewsDto newsToNewsDto(News news);

    @Mapping(target = "commentsCount", expression = "java(news.getComments() == null ? 0 : news.getComments().size())")
    NewsDetailsDto newsToNewsDetailsDto(News news);
}
