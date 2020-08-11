package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireUpdateDto;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireExistsException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.response.AppResponse;
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


    @GetMapping()
    public AppResponse<List<QuestionnaireDto>> getAll() {
        return new AppResponse<>(
                questionnaireService.getAll(),
                HttpStatus.OK
        );
    }

    @GetMapping("/companies/{id}")
    public AppResponse<List<QuestionnaireDto>> getAllByCompany(@PathVariable UUID id) {
        return new AppResponse<>(
                questionnaireService.getAllByCompanyId(id),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public AppResponse<QuestionnaireDto> getOne(@PathVariable UUID id) throws QuestionnaireNotFoundException {
        return new AppResponse<>(
                questionnaireService.getOne(id)
                        .orElseThrow(QuestionnaireNotFoundException::new),
                HttpStatus.OK
        );
    }

    @PostMapping
    public AppResponse<QuestionnaireDto> create(@RequestHeader("authorization") String token,
                                                      @RequestBody QuestionnaireCreateDto createDto) throws CompanyNotFoundException {
        return new AppResponse<>(
                questionnaireService.create(createDto, tokenService.extractCompanyId(token)),
                HttpStatus.OK
        );
    }

    @PutMapping
    public AppResponse<QuestionnaireDto> update(@RequestBody QuestionnaireUpdateDto updateDto) throws QuestionnaireNotFoundException {
        return new AppResponse<>(
                questionnaireService.update(updateDto),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        questionnaireService.delete(id);
    }
}
