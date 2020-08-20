package com.feed_grabber.core.questionnaireResponse;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.questionnaireResponse.dto.QuestionnaireResponseCreateDto;
import com.feed_grabber.core.questionnaireResponse.dto.QuestionnaireResponseDto;
import com.feed_grabber.core.questionnaireResponse.exceptions.QuestionnaireResponseNotFoundException;
import com.feed_grabber.core.questionnaireResponse.model.QuestionnaireResponse;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/responses")
public class QuestionnaireResponseController {

    private final QuestionnaireResponseService responseService;

    @Autowired
    public QuestionnaireResponseController(QuestionnaireResponseService responseService) {
        this.responseService = responseService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<QuestionnaireResponseDto>> getAll() {
        return new AppResponse<>(
                responseService.getAll()
        );
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<QuestionnaireResponseDto> getOne(@PathVariable UUID id)
            throws QuestionnaireResponseNotFoundException {
        return new AppResponse<>(
                responseService.getOne(id).orElseThrow(QuestionnaireResponseNotFoundException::new)
        );
    }

    @GetMapping("/respondent/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<QuestionnaireResponseDto>> getByRespondent(@PathVariable UUID id) {
        return new AppResponse<>(
                responseService.getByRespondentId(id)
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppResponse<UUID> create(@RequestBody QuestionnaireResponseCreateDto createDto)
            throws UserNotFoundException, AlreadyExistsException {
        return new AppResponse<>(
                responseService.create(createDto)
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        responseService.delete(id);
    }

}
