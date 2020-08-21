package com.feed_grabber.core.response;

import com.feed_grabber.core.response.dto.ResponseDto;
import com.feed_grabber.core.responseDeadline.exceptions.DeadlineExpiredException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/response")
public class ResponseController {
    @Autowired
    ResponseService service;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveResponse(@RequestBody ResponseDto dto) throws DeadlineExpiredException {
        service.save(dto);
    }


}
