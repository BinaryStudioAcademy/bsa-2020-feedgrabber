package com.feed_grabber.core.newsReaction;

import com.feed_grabber.core.news.model.News;
import com.feed_grabber.core.newsReaction.model.NewsReaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface NewsReactionRepository extends JpaRepository<NewsReaction, UUID> {
    Optional<NewsReaction> findByUserIdAndNewsIdAndReaction(UUID userId, UUID newsId, String reaction);
}
