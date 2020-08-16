package com.feed_grabber.core.request;

import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.request.dto.RequestCreationRequestDto;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/request")
public class RequestController {

    @Autowired
    RequestService requestService;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<UUID> createNewRequest(@RequestBody RequestCreationRequestDto dto)
            throws UserNotFoundException, QuestionCategoryNotFoundException {
        System.out.println(dto);
        return new AppResponse<>(requestService.createNew(dto));
    }
}
