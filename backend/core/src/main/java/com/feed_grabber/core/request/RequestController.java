package com.feed_grabber.core.request;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.report.ReportService;
import com.feed_grabber.core.request.dto.CreateRequestDto;
import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.request.dto.PendingRequestDto;
import com.feed_grabber.core.request.dto.RequestShortDto;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import static com.feed_grabber.core.role.RoleConstants.*;

@RestController
@RequestMapping("/api/request")
public class RequestController {
    @Autowired
    RequestService requestService;

    @Autowired
    ReportService reportService;

    @ApiOperation(value = "Create new request")
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<UUID> createNewRequest(@RequestBody CreateRequestDto dto)
            throws NotFoundException {
        return new AppResponse<>(requestService.createNew(dto));
    }

    @ApiOperation(value = "Close the request by id", notes = "Report will be generated after closing")
    @PostMapping("/close")
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<Date> closeRequest(@RequestParam UUID requestId) throws NotFoundException, JsonProcessingException {
        reportService.generateReport(requestId);
        return new AppResponse<>(requestService.closeNow(requestId));
    }

    @ApiOperation("Get all requests by questionnaireId")
    @GetMapping
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<List<RequestShortDto>> getAllByQuestionnaireId(@RequestParam("questionnaireId") UUID id) {
        return new AppResponse<>(requestService.getAllByQuestionnaire(id));
    }

    @ApiOperation(value = "Get the pending for the user", notes = "user id is got from token")
    @GetMapping("/pending")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<PendingRequestDto>> getPending() {
        return new AppResponse<>(requestService.getPending(TokenService.getUserId()));
    }

    // @ApiOperation("Get all respondent`s requests with questionnaires")
    // @GetMapping("/respondent")
    // @ResponseStatus(HttpStatus.OK)
    // public AppResponse<List<RequestQuestionnaireDto>> getAllByRespondentId(Principal principal) {
    //     return new AppResponse<>(
    //             requestService.getAllByUserId(UUID.fromString(principal.getName()))
    //     );
    // }
}
