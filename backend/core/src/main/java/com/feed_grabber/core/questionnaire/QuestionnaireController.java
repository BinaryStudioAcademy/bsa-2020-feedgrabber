package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireUpdateDto;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireExistsException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questionnaires")
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;

    @Autowired
    public QuestionnaireController(QuestionnaireService questionnaireService) {
        this.questionnaireService = questionnaireService;
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
    public QuestionnaireDto create(@RequestBody @Valid QuestionnaireCreateDto createDto)
            throws CompanyNotFoundException, QuestionnaireExistsException {
        return questionnaireService.create(createDto);
    }

    @PutMapping
    public QuestionnaireDto update(@RequestBody @Valid QuestionnaireUpdateDto updateDto)
            throws CompanyNotFoundException, QuestionnaireExistsException, QuestionnaireNotFoundException {
        return questionnaireService.update(updateDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) throws QuestionnaireNotFoundException {
        questionnaireService.delete(id);
    }
}
