package com.feed_grabber.core.question;

import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.exceptions.QuestionExistsException;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @ApiOperation(value = "Get all questions from repo")
    @GetMapping()
    public List<QuestionDto> getAll() {
        return questionService.getAll();
    }

    @ApiOperation(value = "Get questions from the specific questionnaire by questionnaireID")
    @GetMapping("/questionnaires/{id}")
    public List<QuestionDto> getAllByQuestionnaire(@ApiParam(
            value = "ID to get the questions list questionnaire", required = true) @PathVariable UUID id) {
        return questionService.getAllByQuestionnaireId(id);
    }

    @ApiOperation(value = "Get the question by id")
    @GetMapping("/{id}")
    public QuestionDto getOne(@ApiParam(value = "ID to get the questionnaire",
            required = true) @PathVariable UUID id) throws QuestionnaireNotFoundException {
        return questionService.getOne(id)
                .orElseThrow(QuestionnaireNotFoundException::new);
    }

    @ApiOperation(value = "Create new question",
        notes = "Provide an question object with text, categoryID and questionnaireID to create new question")
    @PostMapping
    public QuestionDto create(@RequestBody @Valid QuestionCreateDto createDto)
            throws QuestionnaireNotFoundException, QuestionCategoryNotFoundException, QuestionExistsException {
        return questionService.create(createDto);
    }

    @ApiOperation(value = "Update the question",
        notes = "Provide an object with id, text, categoryID and questionnaireID to update the question")
    @PutMapping
    public QuestionDto update(@RequestBody @Valid QuestionUpdateDto updateDto)
            throws QuestionnaireNotFoundException, QuestionNotFoundException, QuestionCategoryNotFoundException, QuestionExistsException {
        return questionService.update(updateDto);
    }

    @ApiOperation(value = "Delete the question")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) throws QuestionNotFoundException {
        questionService.delete(id);
    }
}
