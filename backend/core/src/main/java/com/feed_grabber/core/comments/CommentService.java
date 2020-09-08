package com.feed_grabber.core.comments;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.comments.dto.CommentCreationDto;
import com.feed_grabber.core.comments.dto.CommentDto;
import com.feed_grabber.core.comments.dto.CommentUpdateDto;
import com.feed_grabber.core.comments.exceptions.CommentNotFoundException;
import com.feed_grabber.core.comments.model.Comment;
import com.feed_grabber.core.news.NewsRepository;
import com.feed_grabber.core.news.exceptions.NewsNotFoundException;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private CommentRepository commentRepository;
    private NewsRepository newsRepository;
    private UserRepository userRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, NewsRepository newsRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.newsRepository = newsRepository;
        this.userRepository = userRepository;
    }

    public List<CommentDto> getAllByNewsId(UUID newsId) {
        return commentRepository.findAllByNewsIdOrderByCreatedAt(newsId)
                .stream()
                .map(CommentMapper.MAPPER::commentToCommentDto)
                .collect(Collectors.toList());

    }

    public Long getCountByNewsId(UUID newsId) {
        return commentRepository.countByNewsId(newsId);
    }

    public CommentDto create(CommentCreationDto commentCreationDto) throws NewsNotFoundException, UserNotFoundException {
        var user = userRepository.findById(commentCreationDto.getUserId())
                .orElseThrow(UserNotFoundException::new);
        var news = newsRepository.findById(commentCreationDto.getNewsId())
                .orElseThrow(NewsNotFoundException::new);

        var comment = Comment
                .builder()
                .body(commentCreationDto.getBody())
                .news(news)
                .user(user)
                .build();
        var saved = commentRepository.save(comment);
        return CommentMapper.MAPPER.commentToCommentDto(saved);
    }

    public CommentDto update(CommentUpdateDto commentUpdateDto) throws CommentNotFoundException {
        var comment = commentRepository.findById(commentUpdateDto.getId())
                .orElseThrow(CommentNotFoundException::new);
        comment.setBody(commentUpdateDto.getBody());

        if (TokenService.getUserId() != comment.getUser().getId()) {
            throw new CommentNotFoundException();
        }

        var updated = commentRepository.save(comment);

        return CommentMapper.MAPPER.commentToCommentDto(updated);
    }

    public void delete(UUID id) throws CommentNotFoundException {
        var comment = commentRepository.findById(id).orElseThrow(CommentNotFoundException::new);
        if (TokenService.getUserId() != comment.getUser().getId()) {
            throw new CommentNotFoundException();
        }

        commentRepository.deleteById(id);
    }
}
