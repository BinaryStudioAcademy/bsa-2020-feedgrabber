package com.feed_grabber.core.questionnaireResponse;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.questionnaireResponse.dto.QuestionnaireResponseCreateDto;
import com.feed_grabber.core.questionnaireResponse.dto.QuestionnaireResponseDto;
import com.feed_grabber.core.questionnaireResponse.exceptions.QuestionnaireResponseNotFoundException;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/responses")
public class QuestionnaireResponseController {

    private final TokenService tokenService;
    private final QuestionnaireResponseService responseService;

    @Autowired
    public QuestionnaireResponseController(QuestionnaireResponseService responseService, TokenService tokenService) {
        this.responseService = responseService;
        this.tokenService = tokenService;
    }

    @GetMapping
    public AppResponse<List<QuestionnaireResponseDto>> getAll() {
        return new AppResponse<>(
                responseService.getAll(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public AppResponse<QuestionnaireResponseDto> getOne(@PathVariable UUID id)
            throws QuestionnaireResponseNotFoundException {
        return new AppResponse<>(
                responseService.getOne(id).orElseThrow(QuestionnaireResponseNotFoundException::new),
                HttpStatus.OK
        );
    }

    @GetMapping("/respondent/{id}")
    public AppResponse<List<QuestionnaireResponseDto>> getByRespondent(@PathVariable UUID id) {
        return new AppResponse<>(
                responseService.getByRespondentId(id),
                HttpStatus.OK
        );
    }

    @PostMapping
    public AppResponse<QuestionnaireResponseDto> create(@RequestBody QuestionnaireResponseCreateDto createDto)
            throws UserNotFoundException, AlreadyExistsException {
        return new AppResponse<>(
                responseService.create(createDto),
                HttpStatus.CREATED
        );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        responseService.delete(id);
    }

}
