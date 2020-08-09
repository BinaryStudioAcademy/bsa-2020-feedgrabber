package com.feed_grabber.core.question;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
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


    @GetMapping()
    public List<QuestionDto> getAll() {
        return questionService.getAll();
    }

    @GetMapping("/questionnaires/{id}")
    public List<QuestionDto> getAllByQuestionnaire(@PathVariable UUID id) {
        return questionService.getAllByQuestionnaireId(id);
    }

    @GetMapping("/{id}")
    public QuestionDto getOne(@PathVariable UUID id) throws QuestionnaireNotFoundException {
        return questionService.getOne(id).orElseThrow(QuestionnaireNotFoundException::new);
    }

    @PostMapping
    public QuestionDto create(@RequestBody String json) throws QuestionnaireNotFoundException, JsonProcessingException {
        var dto = new ObjectMapper().readValue(json, QuestionCreateDto.class);

        return questionService.create(dto);
    }

    @PutMapping
    public QuestionDto update(@RequestBody @Valid QuestionUpdateDto updateDto) throws QuestionNotFoundException {
        return questionService.update(updateDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        questionService.delete(id);
    }
}
