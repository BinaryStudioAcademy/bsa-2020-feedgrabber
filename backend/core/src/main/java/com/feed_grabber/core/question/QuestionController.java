
package com.feed_grabber.core.question;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.question.dto.AddExistingQuestionsDto;
import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.response.AppResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<QuestionDto>> getAll() {
        return new AppResponse<>(questionService.getAll());
    }

    @ApiOperation(value = "Get questions from the specific questionnaire by questionnaireID")
    @GetMapping("/questionnaires/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<QuestionDto>> getAllByQuestionnaire(@ApiParam(
            value = "ID to get the questions list questionnaire", required = true) @PathVariable UUID id) {
        return new AppResponse<>(questionService.getAllByQuestionnaireId(id));
    }

    @ApiOperation(value = "Get the question by id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<QuestionDto> getOne(@ApiParam(value = "ID to get the questionnaire",
            required = true) @PathVariable UUID id) throws QuestionnaireNotFoundException {

        return new AppResponse<>(questionService.getOne(id).orElseThrow(QuestionnaireNotFoundException::new));
    }

    @ApiOperation(value = "Create new question",
            notes = "Provide an question object with text, categoryID and questionnaireID to create new question")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public AppResponse<QuestionDto> create(@RequestBody String json)
            throws QuestionnaireNotFoundException, JsonProcessingException, CompanyNotFoundException {

        var dto = new ObjectMapper().readValue(json, QuestionCreateDto.class);

        // if questionnaireId provided - will save it correctly to db
        // otherwise will save only question
        return new AppResponse<>(questionService.create(dto));
    }

    @ApiOperation(value = "Update the question",
            notes = "Provide an object with id, text, categoryID and questionnaireID to update the question")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping
    public AppResponse<QuestionDto> update(@RequestBody String json)
            throws QuestionNotFoundException, JsonProcessingException, CompanyNotFoundException {

        var dto = new ObjectMapper().readValue(json, QuestionUpdateDto.class);

        return new AppResponse<>(questionService.update(dto));

    }

    @ApiOperation(value = "Add existing question to questionnaire")
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping
    public AppResponse<List<QuestionDto>> addExisting(@RequestBody AddExistingQuestionsDto dto)
            throws QuestionNotFoundException, QuestionnaireNotFoundException {

        return new AppResponse<>(questionService.addExistingQuestion(dto));
    }

    @ApiOperation(value = "Delete the question")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        questionService.delete(id);
    }
//
//    @ApiOperation(value = "Delete the question by id and questionnaireId")
//    @DeleteMapping("/questionnaires/{qId}/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    public void deleteOneByQuestionnaireAndID(@ApiParam(
//            value = "IDs to delete one question from questionnaire", required = true) @PathVariable UUID id, @PathVariable UUID qId){
//        questionService.deleteOneByQuestionnaireIdAndQuestionId(id, qId);
//    }
}
