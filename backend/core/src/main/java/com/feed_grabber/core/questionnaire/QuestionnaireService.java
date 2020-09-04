package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireUpdateDto;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireExistsException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.sections.SectionService;
import com.feed_grabber.core.sections.dto.SectionCreateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionnaireService {

    private final QuestionnaireRepository questionnaireRepository;
    private final CompanyRepository companyRepository;

    private final SectionService sectionService;

    @Autowired
    public QuestionnaireService(QuestionnaireRepository questionnaireRepository,
                                CompanyRepository companyRepository,
                                SectionService sectionService) {
        this.questionnaireRepository = questionnaireRepository;
        this.companyRepository = companyRepository;
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

    public List<QuestionnaireDto> getAllByCompanyId(UUID companyId, Integer page, Integer size, boolean archived) {
        return questionnaireRepository.findAllByCompanyId(companyId, archived, PageRequest.of(page, size))
                .stream()
                .map(QuestionnaireMapper.MAPPER::questionnaireToQuestionnaireDto)
                .collect(Collectors.toList());
    }

    public Long getCountByCompanyId(UUID companyId, boolean archived) {
        return questionnaireRepository.countAllByCompanyId(companyId, archived);
    }

    public Optional<QuestionnaireDto> getOne(UUID id) {
        return questionnaireRepository.findById(id)
                .map(QuestionnaireMapper.MAPPER::questionnaireToQuestionnaireDto);
    }

    public QuestionnaireDto create(QuestionnaireCreateDto createDto, UUID companyId)
            throws CompanyNotFoundException, AlreadyExistsException, QuestionnaireNotFoundException {
        if (questionnaireRepository.existsByTitleAndCompanyId(createDto.getTitle(), companyId)) {
            throw new AlreadyExistsException("Such questionnair already exists in this company");
        }

        var company = companyRepository.findById(companyId)
                .orElseThrow(CompanyNotFoundException::new);

        var questionnaire = QuestionnaireMapper.MAPPER
                .questionnaireCreateDtoToModel(createDto, company);

        //questionnaire.setSections(List.of(section));

        var savedQuestionnaire = questionnaireRepository.save(questionnaire);

        var section = sectionService.create(new SectionCreateDto(createDto.getTitle(), questionnaire.getId(), 0));

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
        questionnaire.setArchived(updateDto.isArchived());
        questionnaire = questionnaireRepository.save(questionnaire);
        return QuestionnaireMapper.MAPPER.questionnaireToQuestionnaireDto(questionnaire);
    }

    public void delete(UUID id) {
        questionnaireRepository.softDeleteById(id);
    }
}
