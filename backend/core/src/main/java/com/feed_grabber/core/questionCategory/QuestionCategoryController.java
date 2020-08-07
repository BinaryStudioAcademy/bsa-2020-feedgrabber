package com.feed_grabber.core.questionCategory;

import com.feed_grabber.core.questionCategory.dto.QuestionCategoryCreateDto;
import com.feed_grabber.core.questionCategory.dto.QuestionCategoryDto;
import com.feed_grabber.core.questionCategory.dto.QuestionCategoryUpdateDto;
import com.feed_grabber.core.questionCategory.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryExistsException;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/question_categories")
public class QuestionCategoryController {

    private final QuestionCategoryService questionCategoryService;

    @Autowired
    public QuestionCategoryController(QuestionCategoryService questionCategoryService) {
        this.questionCategoryService = questionCategoryService;
    }

    @ExceptionHandler({QuestionCategoryNotFoundException.class})
    public ResponseEntity<Object> handleQuestionCategoryNotFoundException() {
        return new ResponseEntity<>(
                "Question category not found",
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

    @ExceptionHandler({QuestionCategoryExistsException.class})
    public ResponseEntity<Object> handleQuestionCategoryExistsException() {
        return new ResponseEntity<>(
                "Question category with such company and title already exists",
                HttpStatus.BAD_REQUEST
        );
    }

    @GetMapping()
    public List<QuestionCategoryDto> getAll() {
        return questionCategoryService.getAll();
    }

    @GetMapping("/companies/{id}")
    public List<QuestionCategoryDto> getAllByCompany(@PathVariable UUID id) {
        return questionCategoryService.getAllByCompanyId(id);
    }

    @GetMapping("/{id}")
    public QuestionCategoryDto getOne(@PathVariable UUID id) throws QuestionCategoryNotFoundException {
        return questionCategoryService.getOne(id)
                .orElseThrow(QuestionCategoryNotFoundException::new);
    }

    @PostMapping
    public QuestionCategoryDto create(@RequestBody @Valid QuestionCategoryCreateDto createDto)
            throws CompanyNotFoundException, QuestionCategoryExistsException {
        return questionCategoryService.create(createDto);
    }

    @PutMapping
    public QuestionCategoryDto update(@RequestBody @Valid QuestionCategoryUpdateDto updateDto)
            throws CompanyNotFoundException, QuestionCategoryExistsException, QuestionCategoryNotFoundException {
        return questionCategoryService.update(updateDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) throws QuestionCategoryNotFoundException {
        questionCategoryService.delete(id);
    }
}
