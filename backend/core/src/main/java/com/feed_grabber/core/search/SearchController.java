package com.feed_grabber.core.search;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.search.dto.SearchDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<SearchDto> searchForAllMatch(@RequestParam String query){
        return new AppResponse<>(searchService.getAllByQuery(query));
    }
}
