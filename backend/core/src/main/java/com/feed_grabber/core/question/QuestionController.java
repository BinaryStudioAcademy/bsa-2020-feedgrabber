package com.feed_grabber.core.question;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;
    private final TokenService tokenService;

    @Autowired
    public QuestionController(QuestionService questionService, TokenService tokenService) {
        this.questionService = questionService;
        this.tokenService = tokenService;
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
    public QuestionDto create(@RequestHeader("authorization") String token,
                              @RequestBody String json) throws QuestionnaireNotFoundException, JsonProcessingException {
        var dto = new ObjectMapper().readValue(json, QuestionCreateDto.class);

        return questionService.create(dto, tokenService.extractCompanyId(token));
    }

    @PutMapping
    public QuestionDto update(@RequestHeader("authorization") String token,
                              @RequestBody QuestionUpdateDto updateDto) throws QuestionNotFoundException {

        return questionService.update(updateDto, tokenService.extractCompanyId(token));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        questionService.delete(id);
    }
}
