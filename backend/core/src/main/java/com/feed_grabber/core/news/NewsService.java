package com.feed_grabber.core.news;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.image.ImageRepository;
import com.feed_grabber.core.news.dto.NewsCreateDto;
import com.feed_grabber.core.news.dto.NewsDto;
import com.feed_grabber.core.news.dto.NewsUpdateDto;
import com.feed_grabber.core.news.exceptions.NewsNotFoundException;
import com.feed_grabber.core.news.model.News;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class NewsService {

    private NewsRepository newsRepository;
    private CompanyRepository companyRepository;
    private ImageRepository imageRepository;
    private UserRepository userRepository;

    public NewsService(NewsRepository newsRepository,
                       CompanyRepository companyRepository,
                       ImageRepository imageRepository,
                       UserRepository userRepository) {
        this.newsRepository = newsRepository;
        this.companyRepository = companyRepository;
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
    }

    public List<NewsDto> getAllByCompanyId(Integer from, Integer count, UUID companyId) {
        var pageable = PageRequest.of(from / count, count);
        return newsRepository.findAllNews(companyId, pageable)
                .stream()
                .map(NewsMapper.MAPPER::newsToNewsDto)
                .collect(Collectors.toList());
    }

    public NewsDto create(NewsCreateDto newsCreateDto) throws NotFoundException {
        var image = imageRepository.findById(newsCreateDto.getImageId())
                .orElseThrow(NotFoundException::new);

        var user = userRepository.findById(newsCreateDto.getUserId())
                .orElseThrow(UserNotFoundException::new);

        var company = companyRepository.findById(newsCreateDto.getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);

        var news = News.builder()
                .body(newsCreateDto.getBody())
                .image(image)
                .user(user)
                .company(company)
                .build();
        var saved = newsRepository.save(news);
        return NewsMapper.MAPPER.newsToNewsDto(saved);
    }

    public NewsDto update(NewsUpdateDto newsUpdateDto) throws NotFoundException {
        var news = newsRepository.findById(newsUpdateDto.getId())
                .orElseThrow(NewsNotFoundException::new);
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
}
