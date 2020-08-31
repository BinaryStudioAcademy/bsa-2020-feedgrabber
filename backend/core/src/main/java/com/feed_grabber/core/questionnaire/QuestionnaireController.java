package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.auth.security.TokenService;

import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.question.QuestionService;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireOrderedDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireUpdateDto;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireExistsException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.apiContract.DataList;
import com.feed_grabber.core.sections.exception.SectionNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

import static com.feed_grabber.core.role.RoleConstants.*;

@RestController
@RequestMapping("/api/questionnaires")
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;

    private final QuestionService questionService;

    @Autowired
    public QuestionnaireController(QuestionnaireService questionnaireService, QuestionService questionService) {
        this.questionnaireService = questionnaireService;
        this.questionService = questionService;
    }

    @ApiOperation("Get all questionnaires")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<DataList<QuestionnaireDto>> getAll(
                @RequestParam Integer page,
                @RequestParam Integer size
    ) {
        var companyId = TokenService.getCompanyId();
        var dataList = new DataList<>(
                questionnaireService.getAllByCompanyId(companyId, page, size),
                questionnaireService.getCountByCompanyId(companyId),
                page,
                size
        );
        return new AppResponse<>(dataList);
    }
//    @ApiOperation("Get all questionnaires of company by companyID")
//    @GetMapping("/companies/{id}")
//    public AppResponse<List<QuestionnaireDto>> getAllByCompany(@PathVariable UUID id) {
//        return new AppResponse<>(
//                questionnaireService.getAllByCompanyId(id),
//                HttpStatus.OK
//        );
//    }

    @ApiOperation("Get one questionnaire by id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<QuestionnaireDto> getOne(@PathVariable UUID id) throws QuestionnaireNotFoundException {
        return new AppResponse<>(
                questionnaireService.getOne(id)
                        .orElseThrow(QuestionnaireNotFoundException::new)
        );
    }

    @ApiOperation(value = "Get requests for one questionnaire")
    @GetMapping("/requests/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<QuestionnaireDto> getRequests(@PathVariable UUID id) throws QuestionnaireNotFoundException {
        return new AppResponse<>(
                questionnaireService.getOne(id)
                        .orElseThrow(QuestionnaireNotFoundException::new)
        );
    }

    @ApiOperation("Create a questionnaire")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<QuestionnaireDto> create(@RequestBody QuestionnaireCreateDto createDto)
            throws CompanyNotFoundException, AlreadyExistsException, QuestionnaireNotFoundException {
        return new AppResponse<>(
                questionnaireService.create(createDto, TokenService.getCompanyId())
        );
    }

    @ApiOperation("Update the questionnaire")
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<QuestionnaireDto> update(@RequestBody QuestionnaireUpdateDto updateDto) throws QuestionnaireNotFoundException, CompanyNotFoundException, QuestionnaireExistsException {
        return new AppResponse<>(
                questionnaireService.update(updateDto, TokenService.getCompanyId())
        );
    }

    @ApiOperation("Delete one")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public void delete(@PathVariable UUID id) {
        questionnaireService.delete(id);
    }


    @ApiOperation(value = "Update questions with their indexes in new order",
            notes = "DEPRECATED")
    @Deprecated
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public void updateQuestionnaireQuestions(QuestionnaireOrderedDto dto)
            throws QuestionNotFoundException, QuestionnaireNotFoundException, CompanyNotFoundException, SectionNotFoundException {
        this.questionService.saveOrdered(dto);
    }
}
