package com.feed_grabber.core.response;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.response.dto.ResponseCreateDto;
import com.feed_grabber.core.response.dto.ResponseDto;
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

    @GetMapping("/request")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<ResponseDto> getOneByRequestAndUser(@RequestParam UUID requestId, Principal principal) throws ResponseNotFoundException {
        return new AppResponse<>(
                service.getOneByRequestAndUser(requestId, UUID.fromString(principal.getName()))
                        .orElseThrow(ResponseNotFoundException::new)
        );
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<ResponseDto> update(@RequestBody ResponseDto dto) throws UserNotFoundException, ResponseNotFoundException {
        UUID userId = TokenService.getUserId();
        return new AppResponse<>(
                service.update(dto, userId).orElseThrow(ResponseNotFoundException::new)
        );
    }
}
