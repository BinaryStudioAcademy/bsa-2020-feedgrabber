package com.feed_grabber.core.sections;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.question.QuestionMapper;
import com.feed_grabber.core.question.QuestionService;
import com.feed_grabber.core.question.dto.*;
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

    @ApiOperation(value = "Add new question to the section", notes = "Provide both id: section and question")
    @PutMapping("/question")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<Pair<List<QuestionDto>, UUID>> addQuestion(@RequestBody QuestionCreateDto dto) throws NotFoundException {
        var id = questionService.create(dto).getId();
        return new AppResponse<>(
                Pair.of(sectionService.getSectionQuestions(dto.getSectionId().orElseThrow(NotFoundException::new)), id)
        );
    }

    @ApiOperation(value = "Add new question to the section from existing", notes = "Provide both id: section and question")
    @PutMapping("/add")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<Pair<List<QuestionDto>, UUID>> addQuestionFromExisting(@RequestBody AddExistingQuestionBySectionDto dto) throws NotFoundException {
        questionService.addExistingQuestionBySection(dto);
        return new AppResponse<>(
                Pair.of(sectionService.getSectionQuestions(dto.getSectionId()), dto.getQuestionIndexed().getQuestionId()));
    }

    @PatchMapping("/question/reorder")
    public void questionReordering(@RequestBody SectionsQuestionOrderDto dto) throws NotFoundException {
        sectionService.reorderQuestions(dto);
    }

    @PostMapping("/{id}/question")
    public AppResponse<List<QuestionDto>> updateQuestion(@PathVariable UUID id, @RequestBody QuestionUpdateDto dto) throws NotFoundException {
        questionService.update(dto);
        return new AppResponse<>(sectionService.getSectionQuestions(id));
    }

    @DeleteMapping("/question/{questionId}")
    @ApiOperation(value = "Delete question from section", notes = "Provide both id: section and question")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<QuestionDto>> deleteQuestion(
            @PathVariable UUID questionId,
            @RequestParam UUID sectionId) throws NotFoundException {
        return new AppResponse<>(sectionService.deleteQuestion(sectionId, questionId));
    }

}
