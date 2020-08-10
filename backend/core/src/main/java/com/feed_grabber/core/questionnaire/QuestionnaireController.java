package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireUpdateDto;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<QuestionnaireDto> getAll() {
        return questionnaireService.getAll();
    }

    @GetMapping("/companies/{id}")
    public List<QuestionnaireDto> getAllByCompany(@PathVariable UUID id) {
        return questionnaireService.getAllByCompanyId(id);
    }

    @GetMapping("/{id}")
    public QuestionnaireDto getOne(@PathVariable UUID id) throws QuestionnaireNotFoundException {
        return questionnaireService.getOne(id)
                .orElseThrow(QuestionnaireNotFoundException::new);
    }

    @PostMapping
    public QuestionnaireDto create(@RequestHeader("authorization") String token,
                                   @RequestBody QuestionnaireCreateDto createDto) throws CompanyNotFoundException {

        return questionnaireService.create(createDto, tokenService.extractCompanyId(token));
    }

    @PutMapping
    public QuestionnaireDto update(@RequestBody QuestionnaireUpdateDto updateDto) throws QuestionnaireNotFoundException {
        return questionnaireService.update(updateDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        questionnaireService.delete(id);
    }
}
