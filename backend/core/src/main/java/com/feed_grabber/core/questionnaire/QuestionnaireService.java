package com.feed_grabber.core.questionnaire;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireCreateDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireUpdateDto;
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

    public QuestionnaireDto create(QuestionnaireCreateDto createDto, UUID companyId) throws CompanyNotFoundException {
        var company = companyRepository.findById(companyId)
                .orElseThrow(CompanyNotFoundException::new);

        var questionnaire = QuestionnaireMapper.MAPPER
                .questionnaireCreateDtoToModel(createDto, company);

        return QuestionnaireMapper.MAPPER
                .questionnaireToQuestionnaireDto(questionnaireRepository.save(questionnaire));
    }

    public QuestionnaireDto update(QuestionnaireUpdateDto updateDto) throws QuestionnaireNotFoundException {

        var questionnaire = questionnaireRepository.findById(updateDto.getId())
                .orElseThrow(QuestionnaireNotFoundException::new);

        questionnaire.setTitle(updateDto.getTitle());

        return QuestionnaireMapper.MAPPER
                .questionnaireToQuestionnaireDto(questionnaireRepository.save(questionnaire));
    }

    public void delete(UUID id) {
        questionnaireRepository.deleteById(id);
    }
}
