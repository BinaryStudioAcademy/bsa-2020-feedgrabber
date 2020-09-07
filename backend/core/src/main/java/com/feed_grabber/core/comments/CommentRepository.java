package com.feed_grabber.core.comments;

import com.feed_grabber.core.comments.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findAllByNewsId(UUID newsId);

    Long countByNewsId(UUID newsId);
}
