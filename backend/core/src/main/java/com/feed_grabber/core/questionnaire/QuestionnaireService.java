package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.question.QuestionService;
import com.feed_grabber.core.question.QuestionType;
import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireUpdateDto;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireExistsException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.WrongQuestionnaireTitleException;
import com.feed_grabber.core.sections.SectionService;
import com.feed_grabber.core.sections.dto.SectionCreateDto;
import com.feed_grabber.core.sections.exception.SectionNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class QuestionnaireService {

    private final QuestionnaireRepository questionnaireRepository;
    private final CompanyRepository companyRepository;
    private final QuestionService questionService;
    private final SectionService sectionService;

    @Autowired
    public QuestionnaireService(QuestionnaireRepository questionnaireRepository,
                                CompanyRepository companyRepository,
                                QuestionService questionService, SectionService sectionService) {
        this.questionnaireRepository = questionnaireRepository;
        this.companyRepository = companyRepository;
        this.questionService = questionService;
        this.sectionService = sectionService;
    }

//    public List<QuestionnaireDto> getAll(Integer page, Integer size) {
//        return questionnaireRepository.findAll(PageRequest.of(page, size))
//                .stream()
//                .map(QuestionnaireMapper.MAPPER::questionnaireToQuestionnaireDto)
//                .collect(Collectors.toList());
//    }

//    public Long getCountAll() {
//        return questionnaireRepository.count();
//    }

    public List<QuestionnaireDto> getAllByCompanyId(UUID companyId, Integer page, Integer size) {
        return questionnaireRepository.findAllByCompanyId(companyId, PageRequest.of(page, size))
                .stream()
                .map(QuestionnaireMapper.MAPPER::questionnaireToQuestionnaireDto)
                .collect(Collectors.toList());
    }

    public Long getCountByCompanyId(UUID companyId) {
        return questionnaireRepository.countAllByCompanyId(companyId);
    }

    public Optional<QuestionnaireDto> getOne(UUID id) {
        return questionnaireRepository.findById(id)
                .map(QuestionnaireMapper.MAPPER::questionnaireToQuestionnaireDto);
    }

    public QuestionnaireDto create(QuestionnaireCreateDto createDto, UUID companyId)
            throws NotFoundException, AlreadyExistsException {
        if (questionnaireRepository.existsByTitleAndCompanyId(createDto.getTitle(), companyId)) {
            throw new AlreadyExistsException("Such questionnair already exists in this company");
        }

        if (createDto.getTitle().length() > 40 || createDto.getTitle().length() < 3) {
            throw new WrongQuestionnaireTitleException("Wrong title length: too long (>40) or too short (<3)");
        }

        if (!createDto.getTitle()
                .matches("([a-zA-Z0-9!#$%&'*+\\-\\/=?^_`]+)[ ]?([a-zA-Z0-9!#$%&'*+\\-\\/=?^_`]+)")) {
            throw new WrongQuestionnaireTitleException("Title should be valid. It should not start/end with space, " +
                    "have more than one space in sequence." +
                    "Title can contain latin letters, numbers and special symbols.");
        }

        var company = companyRepository.findById(companyId)
                .orElseThrow(CompanyNotFoundException::new);

        var questionnaire = QuestionnaireMapper.MAPPER
                .questionnaireCreateDtoToModel(createDto, company);

        //questionnaire.setSections(List.of(section));

        var savedQuestionnaire = questionnaireRepository.save(questionnaire);

        var section = sectionService.create(new SectionCreateDto(createDto.getTitle(), questionnaire.getId(), 0));

        questionService.create(new QuestionCreateDto(
                "Default Question",
                "any",
                QuestionType.radio,
                Optional.of(savedQuestionnaire.getId()),
                Optional.of(section.getId()),
                "{\"answerOptions\":[\"Option 1\"],\"includeOther\":false}",
                0,
                false
        ));

        return QuestionnaireMapper.MAPPER
                .questionnaireToQuestionnaireDto(savedQuestionnaire);
    }

    public QuestionnaireDto update(QuestionnaireUpdateDto updateDto, UUID companyId)
            throws CompanyNotFoundException, QuestionnaireExistsException, QuestionnaireNotFoundException {

        var questionnaire = questionnaireRepository.findById(updateDto.getId())
                .orElseThrow(QuestionnaireNotFoundException::new);
        var company = companyRepository.findById(companyId)
                .orElseThrow(CompanyNotFoundException::new);
        if (questionnaireRepository.existsByTitleAndCompanyIdAndIdIsNot(updateDto.getTitle(), companyId, updateDto.getId())) {
            throw new QuestionnaireExistsException();
        }

        questionnaire.setCompany(company);
        questionnaire.setTitle(updateDto.getTitle());
        questionnaire = questionnaireRepository.save(questionnaire);
        return QuestionnaireMapper.MAPPER.questionnaireToQuestionnaireDto(questionnaire);
    }

    public void delete(UUID id) {
        questionnaireRepository.softDeleteById(id);
    }
}
