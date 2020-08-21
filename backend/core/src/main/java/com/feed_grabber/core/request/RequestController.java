package com.feed_grabber.core.request;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.request.dto.CreateRequestDto;
import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.request.dto.PendingRequestDto;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/request")
public class RequestController {
    @Autowired
    RequestService requestService;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<UUID> createNewRequest(@RequestBody CreateRequestDto dto)
            throws UserNotFoundException, QuestionCategoryNotFoundException {
        return new AppResponse<>(requestService.createNew(dto));
    }

    @GetMapping("/pending")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<PendingRequestDto>> createNewRequest() {
        return new AppResponse<>(requestService.getPending(TokenService.getUserId()));
    }

}
