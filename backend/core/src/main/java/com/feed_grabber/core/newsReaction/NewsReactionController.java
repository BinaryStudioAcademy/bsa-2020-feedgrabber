package com.feed_grabber.core.newsReaction;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.newsReaction.dto.ReactionCreationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/news/reaction")
public class NewsReactionController {
    private NewsReactionService service;

    @Autowired
    public NewsReactionController(NewsReactionService service) {
        this.service = service;
    }

    @PostMapping
    public void reactOnNews(@RequestBody ReactionCreationDto creationDto) throws NotFoundException {
        service.reactOnNews(creationDto);
    }
}
