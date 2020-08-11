package com.feed_grabber.core.questionCategory;

import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.questionCategory.dto.QuestionCategoryCreateDto;
import com.feed_grabber.core.questionCategory.dto.QuestionCategoryDto;
import com.feed_grabber.core.questionCategory.dto.QuestionCategoryUpdateDto;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryExistsException;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
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

    @ApiOperation(value = "Get all question categories")
    @GetMapping()
    public List<QuestionCategoryDto> getAll() {
        return questionCategoryService.getAll();
    }

    @ApiOperation(value = "Get all the categories of questions from one company")
    @GetMapping("/companies/{id}")
    public List<QuestionCategoryDto> getAllByCompany(@PathVariable UUID id) {
        return questionCategoryService.getAllByCompanyId(id);
    }

    @ApiOperation(value = "Get the question category by id")
    @GetMapping("/{id}")
    public QuestionCategoryDto getOne(@PathVariable UUID id) throws QuestionCategoryNotFoundException {
        return questionCategoryService.getOne(id)
                .orElseThrow(QuestionCategoryNotFoundException::new);
    }

    @ApiOperation(value = "Create new category")
    @PostMapping
    public QuestionCategoryDto create(@ApiParam("Provide an category object with title " +
            "and companyID to create new category") @RequestBody @Valid QuestionCategoryCreateDto createDto)
            throws CompanyNotFoundException, QuestionCategoryExistsException {
        return questionCategoryService.create(createDto);
    }

    @ApiOperation(value = "Update the category")
    @PutMapping
    public QuestionCategoryDto update(@ApiParam("Provide an category object with id, title " +
            "and companyID to create new category") @RequestBody @Valid QuestionCategoryUpdateDto updateDto)
            throws  QuestionCategoryExistsException, QuestionCategoryNotFoundException {
        return questionCategoryService.update(updateDto);
    }

    @ApiOperation(value = "Delete the category by id")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        questionCategoryService.delete(id);
    }
}
