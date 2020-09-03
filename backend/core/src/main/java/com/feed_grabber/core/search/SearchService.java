package com.feed_grabber.core.search;

import com.feed_grabber.core.search.dto.SearchDto;
import org.springframework.stereotype.Service;

@Service
public class SearchService {
private final SearchRepository searchRepository;

    public SearchService(SearchRepository searchRepository) {
        this.searchRepository = searchRepository;
    }

    public SearchDto getAllByQuery(String query){
        return searchRepository.findAllByQuery(query);
    }
}
