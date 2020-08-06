package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireUpdateDto;
import com.feed_grabber.core.questionnaire.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireExistsException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @ExceptionHandler({QuestionnaireNotFoundException.class})
    public ResponseEntity<Object> handleQuestionnaireNotFoundException() {
        return new ResponseEntity<>(
                "Questionnaire not found",
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler({CompanyNotFoundException.class})
    public ResponseEntity<Object> handleCompanyNotFoundException() {
        return new ResponseEntity<>(
                "Company not found",
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler({QuestionnaireExistsException.class})
    public ResponseEntity<Object> handleQuestionnaireExistsException() {
        return new ResponseEntity<>(
                "Questionnaire with such company and title already exists",
                HttpStatus.NOT_FOUND
        );
    }

    @GetMapping()
    public List<QuestionnaireDto> getAll() {
        return questionnaireService.getAll();
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
