package com.feed_grabber.core.response;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.response.dto.ResponseCreateDto;
import com.feed_grabber.core.response.dto.ResponseDto;
import com.feed_grabber.core.response.dto.ResponseUpdateDto;
import com.feed_grabber.core.response.exceptions.ResponseNotFoundException;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("api/response")
public class ResponseController {
    @Autowired
    ResponseService service;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveResponse(@RequestBody ResponseCreateDto dto) { service.save(dto); }

    @GetMapping("/request/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<ResponseDto> getOneByRequestAndUser(@PathVariable UUID id) throws ResponseNotFoundException {
        UUID userId = TokenService.getUserId();
        return new AppResponse<>(
                service.getOneByRequestAndUser(id, userId)
                        .orElseThrow(ResponseNotFoundException::new)
        );
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<ResponseDto> update(@RequestBody ResponseUpdateDto dto) throws ResponseNotFoundException {
        return new AppResponse<>(
                service.update(dto).orElseThrow(ResponseNotFoundException::new)
        );
    }
}
