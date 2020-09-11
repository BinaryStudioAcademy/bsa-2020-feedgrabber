package com.feed_grabber.core.sections;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.question.QuestionService;
import com.feed_grabber.core.question.dto.AddExistingQuestionBySectionDto;
import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.sections.dto.*;
import com.feed_grabber.core.sections.exception.SectionNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/section")
public class SectionController {
    private final SectionService sectionService;
    private final QuestionService questionService;

    public SectionController(SectionService sectionService, QuestionService questionService) {
        this.sectionService = sectionService;
        this.questionService = questionService;
    }

    @ApiOperation("Create new section")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppResponse<SectionDto> create(@RequestBody SectionCreateDto createDto)
            throws QuestionnaireNotFoundException {
        return new AppResponse<>(sectionService.create(createDto));
    }

    @ApiOperation("Get all sections with questions")
    @GetMapping("/questionnaire/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<SectionQuestionsDto>> getByQuestionnaire(@PathVariable UUID id) {
        return new AppResponse<>(sectionService.getByQuestionnaire(id));
    }

    @ApiOperation(value = "Update section by id and providing section title and description")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<SectionDto> update(@PathVariable UUID id, @RequestBody SectionUpdateDto dto)
            throws SectionNotFoundException {
        return new AppResponse<>(sectionService.update(id, dto));
    }

    @ApiOperation(value = "Add new question to the section")
    @PutMapping("/question")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<QuestionDto> addQuestion(@RequestBody QuestionCreateDto dto) throws NotFoundException {
        return new AppResponse<>(questionService.create(dto));
    }

    @PatchMapping("/question/reorder")
    public void questionReordering(@RequestBody SectionsQuestionOrderDto dto) throws NotFoundException {
        sectionService.reorderQuestions(dto);
    }

    @DeleteMapping("/{sectionId}/{questionId}")
    @ApiOperation(value = "Delete question from section", notes = "Provide both id: section and question")
    @ResponseStatus(HttpStatus.OK)
    public void deleteQuestion(@PathVariable UUID questionId, @PathVariable UUID sectionId) throws NotFoundException {
        sectionService.deleteQuestion(sectionId, questionId);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete section from questionnaire")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) throws SectionNotFoundException {
        sectionService.delete(id);
    }
}
