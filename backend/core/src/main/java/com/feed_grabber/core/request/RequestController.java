package com.feed_grabber.core.request;

import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.request.dto.CreateRequestDto;
import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.request.dto.RequestQuestionnaireDto;
import com.feed_grabber.core.request.dto.RequestShortDto;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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

    @ApiOperation("Get all respondent`s requests with questionnaires")
    @GetMapping("/respondent")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<RequestQuestionnaireDto>> getAllByRespondentId(Principal principal) {
        return new AppResponse<>(
                requestService.getAllByUserId(UUID.fromString(principal.getName()))
        );
    }

    @ApiOperation("Get all requests by questionnaireId")
    @GetMapping
    public AppResponse<List<RequestShortDto>> getAllByQuestionnaireId(@RequestParam("questionnaireId") UUID id) {
        return new AppResponse<>(requestService.getAllByQuestionnaire(id));
    }
}
