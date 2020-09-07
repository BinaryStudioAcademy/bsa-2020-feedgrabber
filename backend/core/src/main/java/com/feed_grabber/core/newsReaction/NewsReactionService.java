package com.feed_grabber.core.newsReaction;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.news.NewsRepository;
import com.feed_grabber.core.newsReaction.dto.ReactionCreationDto;
import com.feed_grabber.core.newsReaction.model.NewsReaction;
import com.feed_grabber.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class NewsReactionService {
    private UserRepository userRepository;
    private NewsRepository newsRepository;
    private NewsReactionRepository repository;

    @Autowired
    public NewsReactionService(UserRepository userRepository, NewsRepository newsRepository, NewsReactionRepository repository) {
        this.userRepository = userRepository;
        this.repository = repository;
        this.newsRepository = newsRepository;
    }

    public void reactOnNews(ReactionCreationDto creationDto) throws NotFoundException {
        var reaction = repository.findByUserIdAndNewsIdAndReaction(TokenService.getUserId(), creationDto.getNewsId(), creationDto.getReaction());
        if (reaction.isPresent()) {
            removeReaction(reaction.get().getId());
        } else {
            addReaction(creationDto);
        }
    }

    private void addReaction(ReactionCreationDto creationDto) throws NotFoundException {
        var user = userRepository.findById(TokenService.getUserId()).orElseThrow(NotFoundException::new);
        var news = newsRepository.findById(creationDto.getNewsId()).orElseThrow(NotFoundException::new);
        repository.save(NewsReaction.builder().news(news).user(user).reaction(creationDto.getReaction()).build());
    }

    private void removeReaction(UUID reactionId) {
        repository.deleteById(reactionId);
    }
}
