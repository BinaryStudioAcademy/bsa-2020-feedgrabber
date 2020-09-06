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

    public List<NewsDto> getAllByCompanyId(Integer page, Integer size, UUID companyId) {
        var pageable = PageRequest.of(page, size);
        return newsRepository.findAllNews(companyId, pageable)
                .stream()
                .map(NewsMapper.MAPPER::newsToNewsDto)
                .collect(Collectors.toList());
    }

    public Long getCountByCompanyId(UUID companyId) {
        return newsRepository.countAllByCompanyId(companyId);
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
}
