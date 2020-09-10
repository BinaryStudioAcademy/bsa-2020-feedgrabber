package com.feed_grabber.core.news;

import com.feed_grabber.core.comments.CommentRepository;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.image.ImageRepository;
import com.feed_grabber.core.news.dto.NewsCreateDto;
import com.feed_grabber.core.news.dto.NewsDetailsDto;
import com.feed_grabber.core.news.dto.NewsDto;
import com.feed_grabber.core.news.dto.NewsUpdateDto;
import com.feed_grabber.core.news.exceptions.NewsNotFoundException;
import com.feed_grabber.core.news.model.News;
import com.feed_grabber.core.newsReaction.NewsReactionRepository;
import com.feed_grabber.core.newsReaction.dto.ReactionDto;
import com.feed_grabber.core.newsReaction.model.NewsReaction;
import com.feed_grabber.core.user.UserMapper;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.dto.UserShortDto;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class NewsService {

    private NewsRepository newsRepository;
    private CompanyRepository companyRepository;
    private ImageRepository imageRepository;
    private UserRepository userRepository;
    private CommentRepository commentRepository;
    private NewsReactionRepository newsReactionRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository,
                       CompanyRepository companyRepository,
                       ImageRepository imageRepository,
                       CommentRepository commentRepository,
                       NewsReactionRepository newsReactionRepository,
                       UserRepository userRepository) {
        this.newsRepository = newsRepository;
        this.companyRepository = companyRepository;
        this.imageRepository = imageRepository;
        this.newsReactionRepository = newsReactionRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public List<NewsDto> getAllByCompanyId(Integer page, Integer size, UUID companyId) {
        var pageable = PageRequest.of(page, size);
        return newsRepository.findAllNews(companyId, pageable)
                .stream()
                .map(NewsMapper.MAPPER::newsToNewsDto)
                .map(n -> addReactions(n))
                .collect(Collectors.toList());
    }

    public NewsDto addReactions(NewsDto news) {
        news.setReactions(newsReactionRepository.findAllByNewsId(news.getId())
                .stream()
                .filter(distinctByKey(r -> r.getReaction()))
                .map(r -> createReaction(r, news.getId()))
                .collect(Collectors.toList()));
        return news;
    }

    public ReactionDto createReaction(NewsReaction reaction, UUID newsId) {
        var reactedUsers = newsReactionRepository
                .findAllByNewsIdAndReaction(newsId, reaction.getReaction())
                .stream()
                .map(r -> UserMapper.MAPPER.shortFromUser(r.getUser()))
                .collect(Collectors.toList());
        var currentUserReaction = newsReactionRepository
                .findByUserIdAndNewsIdAndReaction(TokenService.getUserId(), newsId, reaction.getReaction());
        return new ReactionDto(reaction.getReaction(), currentUserReaction.isPresent(), reactedUsers);
    }

    public Long getCountByCompanyId(UUID companyId) {
        return newsRepository.countAllByCompanyId(companyId);
    }

    public NewsDetailsDto getNewsById(UUID id) throws NewsNotFoundException {
        var news = newsRepository.findById(id).orElseThrow(NewsNotFoundException::new);
        var comments = commentRepository.findAllByNewsIdOrderByCreatedAt(news.getId());
        news.setComments(comments);
        return NewsMapper.MAPPER.newsToNewsDetailsDto(news);
    }

    public NewsDto create(NewsCreateDto newsCreateDto) throws NotFoundException {
        var news = News.builder()
                .title(newsCreateDto.getTitle())
                .type(newsCreateDto.getType())
                .body(newsCreateDto.getBody());

        if (newsCreateDto.getImageId() != null) {
            var image = imageRepository.findById(newsCreateDto.getImageId())
                    .orElseThrow(NotFoundException::new);
            news.image(image);
        }

        var user = userRepository.findById(newsCreateDto.getUserId())
                .orElseThrow(UserNotFoundException::new);

        var company = companyRepository.findById(newsCreateDto.getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);

        news.user(user);
        news.company(company);
        var saved = newsRepository.save(news.build());
        return NewsMapper.MAPPER.newsToNewsDto(saved);
    }

    public NewsDto update(NewsUpdateDto newsUpdateDto) throws NotFoundException {
        var news = newsRepository.findById(newsUpdateDto.getId())
                .orElseThrow(NewsNotFoundException::new);
        news.setTitle(newsUpdateDto.getTitle());
        news.setType(newsUpdateDto.getType());
        news.setBody(newsUpdateDto.getBody());

        var image = imageRepository.findById(newsUpdateDto.getImageId())
                .orElseThrow(NotFoundException::new);
        news.setImage(image);

        var updatedNews = newsRepository.save(news);
        return NewsMapper.MAPPER.newsToNewsDto(updatedNews);
    }

    public void delete(UUID id) {
        newsRepository.deleteById(id);
    }

    public static <T> Predicate<T> distinctByKey(
            Function<? super T, ?> keyExtractor) {

        Map<Object, Boolean> seen = new ConcurrentHashMap<>();
        return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }
}
