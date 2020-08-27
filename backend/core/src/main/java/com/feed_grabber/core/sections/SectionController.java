package com.feed_grabber.core.sections;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.sections.dto.SectionCreateDto;
import com.feed_grabber.core.sections.dto.SectionDto;
import com.feed_grabber.core.sections.dto.SectionQuestionsDto;
import com.feed_grabber.core.sections.dto.SectionUpdateDto;
import com.feed_grabber.core.sections.exception.SectionNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/section")
public class SectionController {

    private final SectionService sectionService;

    @Autowired
    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
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

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<SectionDto> update(@PathVariable UUID id, @RequestBody SectionUpdateDto dto)
            throws SectionNotFoundException {
        return new AppResponse<>(sectionService.update(id, dto));
    }

    @PutMapping("/question/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<SectionQuestionsDto> addQuestion(@PathVariable UUID id, @RequestParam UUID sectionId)
            throws SectionNotFoundException, QuestionNotFoundException {
        return new AppResponse<>(sectionService.addQuestion(sectionId, id));
    }

    @DeleteMapping("/question/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<SectionQuestionsDto> deleteQuestion(@PathVariable UUID id, @RequestParam UUID sectionId)
            throws SectionNotFoundException, QuestionNotFoundException {
        return new AppResponse<>(sectionService.deleteQuestion(sectionId, id));
    }

}
