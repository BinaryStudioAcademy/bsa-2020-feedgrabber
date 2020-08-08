package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireUpdateDto;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireExistsException;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class QuestionnaireService {

    private final QuestionnaireRepository questionnaireRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public QuestionnaireService(QuestionnaireRepository questionnaireRepository,
                                CompanyRepository companyRepository) {
        this.questionnaireRepository = questionnaireRepository;
        this.companyRepository = companyRepository;
    }

    public List<QuestionnaireDto> getAll() {
        return questionnaireRepository.findAll()
                .stream()
                .map(QuestionnaireMapper.MAPPER::questionnaireToQuestionnaireDto)
                .collect(Collectors.toList());
    }

    public List<QuestionnaireDto> getAllByCompanyId(UUID companyId) {
        return questionnaireRepository.findAllByCompanyId(companyId)
                .stream()
                .map(QuestionnaireMapper.MAPPER::questionnaireToQuestionnaireDto)
                .collect(Collectors.toList());
    }

    public Optional<QuestionnaireDto> getOne(UUID id) {
        return questionnaireRepository.findById(id)
                .map(QuestionnaireMapper.MAPPER::questionnaireToQuestionnaireDto);
    }

    public QuestionnaireDto create(QuestionnaireCreateDto createDto)
            throws CompanyNotFoundException, QuestionnaireExistsException {

        var company = companyRepository.findById(createDto.getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);
        if (questionnaireRepository.existsByTitleAndCompanyId(createDto.getTitle(), createDto.getCompanyId())) {
            throw new QuestionnaireExistsException();
        }

        var questionnaire = QuestionnaireMapper.MAPPER.questionnaireCreateDtoToModel(createDto, company);
        questionnaire = questionnaireRepository.save(questionnaire);
        return QuestionnaireMapper.MAPPER.questionnaireToQuestionnaireDto(questionnaire);
    }

    public QuestionnaireDto update(QuestionnaireUpdateDto updateDto)
            throws CompanyNotFoundException, QuestionnaireExistsException, QuestionnaireNotFoundException {

        var questionnaire = questionnaireRepository.findById(updateDto.getId())
                .orElseThrow(QuestionnaireNotFoundException::new);
        var company = companyRepository.findById(updateDto.getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);
        if (questionnaireRepository.existsByTitleAndCompanyIdAndIdIsNot(updateDto.getTitle(), updateDto.getCompanyId(), updateDto.getId())) {
            throw new QuestionnaireExistsException();
        }

        questionnaire.setCompany(company);
        questionnaire.setTitle(updateDto.getTitle());
        questionnaire = questionnaireRepository.save(questionnaire);
        return QuestionnaireMapper.MAPPER.questionnaireToQuestionnaireDto(questionnaire);
    }

    public void delete(UUID id) throws QuestionnaireNotFoundException {
        var questionnaire = questionnaireRepository.findById(id)
                .orElseThrow(QuestionnaireNotFoundException::new);

        questionnaireRepository.delete(questionnaire);
    }
}
