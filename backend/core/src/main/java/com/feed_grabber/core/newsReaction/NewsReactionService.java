package com.feed_grabber.core.newsReaction;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.config.NotificationService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.news.NewsRepository;
import com.feed_grabber.core.news.model.News;
import com.feed_grabber.core.newsReaction.dto.ReactionCreationDto;
import com.feed_grabber.core.newsReaction.dto.ReactionCreationResponseDto;
import com.feed_grabber.core.newsReaction.model.NewsReaction;
import com.feed_grabber.core.notification.UserNotificationService;
import com.feed_grabber.core.user.UserMapper;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class NewsReactionService {
    private UserRepository userRepository;
    private NewsRepository newsRepository;
    private NewsReactionRepository repository;
    private NotificationService notificationService;

    @Autowired
    public NewsReactionService(UserRepository userRepository,
                               NewsRepository newsRepository,
                               NewsReactionRepository repository,
                               NotificationService notificationService) {
        this.userRepository = userRepository;
        this.repository = repository;
        this.newsRepository = newsRepository;
        this.notificationService = notificationService;
    }

    public void reactOnNews(ReactionCreationDto creationDto) throws NotFoundException {
        var reaction = repository.findByUserIdAndNewsIdAndReaction(TokenService.getUserId(), creationDto.getNewsId(), creationDto.getReaction());
        var user = userRepository.findById(TokenService.getUserId()).orElseThrow(NotFoundException::new);
        var news = newsRepository.findById(creationDto.getNewsId()).orElseThrow(NotFoundException::new);
        var companyUserIds = userRepository.findAllByCompanyId(news.getCompany().getId())
                .stream().map(u -> u.getId().toString())
                .collect(Collectors.toList());
        if (reaction.isPresent()) {
            removeReaction(reaction.get().getId(), reaction.get().getReaction(), user, companyUserIds, news.getId());
        } else {
            addReaction(creationDto, user, companyUserIds, news);
        }
    }

    private void addReaction(ReactionCreationDto creationDto, User currentUser, List<String> companyUserIds, News news) throws NotFoundException {
        repository.save(NewsReaction.builder().news(news).user(currentUser).reaction(creationDto.getReaction()).build());
        notificationService.sendMessageToUsers(companyUserIds, "react",
                new ReactionCreationResponseDto(
                        news.getId(),
                        creationDto.getReaction(),
                        UserMapper.MAPPER.shortFromUser(currentUser),
                        true
                )
        );
    }

    private void removeReaction(UUID reactionId, String reaction, User currentUser, List<String> companyUserIds, UUID newsId) {
        repository.deleteById(reactionId);
        notificationService.sendMessageToUsers(companyUserIds, "react",
                new ReactionCreationResponseDto(
                        newsId,
                        reaction,
                        UserMapper.MAPPER.shortFromUser(currentUser),
                        false
                )
        );
    }
}
