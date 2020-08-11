package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireUpdateDto;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireExistsException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.response.AppResponse;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questionnaires")
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;
    private final TokenService tokenService;

    @Autowired
    public QuestionnaireController(QuestionnaireService questionnaireService, TokenService tokenService) {
        this.questionnaireService = questionnaireService;
        this.tokenService = tokenService;
    }

    @ApiOperation("Get all questionnaires")
    @GetMapping()
    public AppResponse<List<QuestionnaireDto>> getAll() {
        return new AppResponse<>(
                questionnaireService.getAll(),
                HttpStatus.OK
        );
    }

    @ApiOperation("Get all questionnaires of company by companyID")
    @GetMapping("/companies/{id}")
    public AppResponse<List<QuestionnaireDto>> getAllByCompany(@PathVariable UUID id) {
        return new AppResponse<>(
                questionnaireService.getAllByCompanyId(id),
                HttpStatus.OK
        );
    }

    @ApiOperation("Get one questionnaire by id")
    @GetMapping("/{id}")
    public AppResponse<QuestionnaireDto> getOne(@PathVariable UUID id) throws QuestionnaireNotFoundException {
        return new AppResponse<>(
                questionnaireService.getOne(id)
                        .orElseThrow(QuestionnaireNotFoundException::new),
                HttpStatus.OK
        );
    }

    @ApiOperation("Create a questionnaire")
    @PostMapping
    public AppResponse<QuestionnaireDto> create(@RequestHeader("authorization") String token,
                                                      @RequestBody QuestionnaireCreateDto createDto) throws CompanyNotFoundException, AlreadyExistsException {
        return new AppResponse<>(
                questionnaireService.create(createDto, tokenService.extractCompanyId(token)),
                HttpStatus.OK
        );
    }

    @ApiOperation("Update the questionnaire")
    @PutMapping
    public AppResponse<QuestionnaireDto> update(@RequestBody QuestionnaireUpdateDto updateDto) throws QuestionnaireNotFoundException {
        return new AppResponse<>(
                questionnaireService.update(updateDto),
                HttpStatus.OK
        );
    }

    @ApiOperation("Delete one")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        questionnaireService.delete(id);
    }
}
