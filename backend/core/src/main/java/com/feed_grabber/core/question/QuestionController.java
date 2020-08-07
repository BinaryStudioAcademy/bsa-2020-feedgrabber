package com.feed_grabber.core.question;

import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.exceptions.QuestionExistsException;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.questionCategory.exceptions.QuestionCategoryNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
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

    @ExceptionHandler({QuestionNotFoundException.class})
    public ResponseEntity<Object> handleQuestionNotFoundException() {
        return new ResponseEntity<>(
                "Question not found",
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler({QuestionnaireNotFoundException.class})
    public ResponseEntity<Object> handleQuestionnaireNotFoundException() {
        return new ResponseEntity<>(
                "Questionnaire not found",
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler({QuestionCategoryNotFoundException.class})
    public ResponseEntity<Object> handleQuestionCategoryNotFoundException() {
        return new ResponseEntity<>(
                "Question category not found",
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler({QuestionExistsException.class})
    public ResponseEntity<Object> handleQuestionExistsException() {
        return new ResponseEntity<>(
                "Question with such text, questionnaire and category already exists",
                HttpStatus.BAD_REQUEST
        );
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
        return questionService.getOne(id)
                .orElseThrow(QuestionnaireNotFoundException::new);
    }

    @PostMapping
    public QuestionDto create(@RequestBody @Valid QuestionCreateDto createDto)
            throws QuestionnaireNotFoundException, QuestionCategoryNotFoundException, QuestionExistsException {
        return questionService.create(createDto);
    }

    @PutMapping
    public QuestionDto update(@RequestBody @Valid QuestionUpdateDto updateDto)
            throws QuestionnaireNotFoundException, QuestionNotFoundException, QuestionCategoryNotFoundException, QuestionExistsException {
        return questionService.update(updateDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) throws QuestionNotFoundException {
        questionService.delete(id);
    }
}
