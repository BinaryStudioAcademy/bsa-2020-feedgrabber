
package com.feed_grabber.core.question;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.apiContract.DataList;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.question.dto.*;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.sections.exception.SectionNotFoundException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.feed_grabber.core.auth.security.TokenService.getCompanyId;
import static com.feed_grabber.core.role.RoleConstants.ROLE_COMPANY_OWNER;
import static com.feed_grabber.core.role.RoleConstants.ROLE_HR;

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
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<DataList<QuestionDto>> getAll(
            @RequestParam(required = false) Optional<String> query,
            @RequestParam Integer page,
            @RequestParam Integer size
    ) {
        var companyId = getCompanyId();
        return new AppResponse<>(new DataList<>(
                questionService.getAll(companyId, page, size),
                questionService.countByCompanyId(companyId),
                page,
                size
        ));
    }

    @ApiOperation(value = "Get all questions from repo not in questionnaire")
    @GetMapping("/except/{questionnaireId}")
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<DataList<QuestionDto>> getAllExceptQuestionnaire(
            @RequestParam Integer page,
            @RequestParam Integer size,
            @RequestParam(required = false) String query,
            @PathVariable UUID questionnaireId
    ) {
        if (query == null) {
            return new AppResponse<>(
                    questionService.getAllExceptOneQuestionnaire(questionnaireId, page, size)
            );
        }
        var searched = questionService.searchAll(Optional.of(query), page, size, Optional.of(questionnaireId));
        return new AppResponse<>(
                new DataList<>(
                        searched.getObjects(),
                        searched.getSize(),
                        page,
                        size
                )
        );
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
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<QuestionDto> getOne(@ApiParam(value = "ID to get the questionnaire",
            required = true) @PathVariable UUID id) throws QuestionnaireNotFoundException {

        return new AppResponse<>(questionService.getOne(id).orElseThrow(QuestionnaireNotFoundException::new));
    }

    @ApiOperation(value = "Create new question",
            notes = "Provide an question object with text, categoryID and questionnaireID to create new question")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<QuestionDto> create(@RequestBody String json)
            throws NotFoundException, JsonProcessingException {

        var dto = new ObjectMapper().readValue(json, QuestionCreateDto.class);

        // if questionnaireId provided - will save it correctly to db
        // otherwise will save only question
        return new AppResponse<>(questionService.create(dto));
    }

    @ApiOperation(value = "Update the question",
            notes = "Provide an object with id, text, categoryID and questionnaireID to update the question")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<QuestionDto> update(@RequestBody QuestionUpdateDto dto) throws QuestionNotFoundException, CompanyNotFoundException {
        return new AppResponse<>(questionService.update(dto));
    }

    @ApiOperation(value = "Add existing question to questionnaire")
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public void addExisting(@RequestBody AddExistingQuestionsDto dto) throws SectionNotFoundException {
        questionService.addExistingQuestions(dto);
    }

    @ApiOperation(value = "Delete the question")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public void delete(@PathVariable UUID id) {
        questionService.delete(id);
    }


    @ApiOperation(value = "Move question to section",
            notes = "Provide section id and list of indexes of questions in this section")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/index")
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public void index(@RequestBody QuestionIndexDto dto) throws NotFoundException {
        questionService.index(dto);
    }

    @ApiOperation(value = "Delete the question by id and questionnaireId")
    @DeleteMapping("/questionnaires/{questionId}/{questionnaireId}")
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<List<QuestionDto>> deleteOneByQuestionnaireAndID(
            @PathVariable UUID questionId,
            @PathVariable UUID questionnaireId
    ) throws QuestionnaireNotFoundException {

        questionService.deleteOneByQuestionnaireIdAndQuestionId(questionId, questionnaireId);

        return new AppResponse<>(questionService.getAllByQuestionnaireId(questionnaireId));
    }

    @ApiOperation(value = "Get all questions from one section",
            notes = "Provide id in the path to get questions")
    @GetMapping("/sections/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<QuestionDto>> getAllBySection(@PathVariable UUID id) {
        return new AppResponse<>(questionService.getAllBySection(id));
    }

}
