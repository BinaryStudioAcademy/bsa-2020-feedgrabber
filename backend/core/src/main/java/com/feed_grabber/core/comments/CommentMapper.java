package com.feed_grabber.core.comments;

import com.feed_grabber.core.comments.dto.CommentDto;
import com.feed_grabber.core.comments.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommentMapper {
    CommentMapper MAPPER = Mappers.getMapper(CommentMapper.class);

    CommentDto commentToCommentDto(Comment comment);
}
