package com.feed_grabber.core.sections;

import com.feed_grabber.core.question.QuestionRepository;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.sections.dto.SectionCreateDto;
import com.feed_grabber.core.sections.dto.SectionDto;
import com.feed_grabber.core.sections.dto.SectionQuestionsDto;
import com.feed_grabber.core.sections.dto.SectionUpdateDto;
import com.feed_grabber.core.sections.exception.SectionNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SectionService {
    private final SectionRepository sectionRepository;
    private final QuestionRepository questionRepository;
    private final QuestionnaireRepository questionnaireRepository;

    @Autowired
    public SectionService(SectionRepository sectionRepository,
                          QuestionRepository questionRepository,
                          QuestionnaireRepository questionnaireRepository) {
        this.sectionRepository = sectionRepository;
        this.questionRepository = questionRepository;
        this.questionnaireRepository = questionnaireRepository;
    }

    public SectionDto create(SectionCreateDto createDto) throws QuestionnaireNotFoundException {
        if (createDto.getTitle() == null) createDto.setTitle("New section");

        var questionnaire = questionnaireRepository.findById(createDto.getQuestionnaireId())
                .orElseThrow(QuestionnaireNotFoundException::new);

        var section = SectionMapper.MAPPER.createDtoToModel(createDto, questionnaire);
        return SectionMapper.MAPPER.modelToDto(sectionRepository.save(section));
    }

    public List<SectionQuestionsDto> getByQuestionnaire(UUID id) {
        return sectionRepository.findByQuestionnaireIdOrderByOrder(id)
                .stream()
                .map(section ->
                        SectionMapper.MAPPER.sectionAndQuestionsDto(section, questionRepository.findAllBySectionId(section.getId())))
                .collect(Collectors.toList());
    }

    public SectionQuestionsDto addQuestion(UUID sectionId, UUID questionId) throws SectionNotFoundException, QuestionNotFoundException {
        var section = sectionRepository.findById(sectionId).orElseThrow(SectionNotFoundException::new);

        questionRepository.findById(questionId).orElseThrow(QuestionNotFoundException::new);

        sectionRepository.addQuestion(sectionId, questionId, Integer.MAX_VALUE);

        return SectionMapper.MAPPER.sectionAndQuestionsDto(section, questionRepository.findAllBySectionId(section.getId()));
    }

    public SectionQuestionsDto deleteQuestion(UUID sectionId, UUID questionId) throws SectionNotFoundException, QuestionNotFoundException {
        var section = sectionRepository.findById(sectionId).orElseThrow(SectionNotFoundException::new);

        questionRepository.findById(questionId).orElseThrow(QuestionNotFoundException::new);

        sectionRepository.deleteQuestion(sectionId, questionId);

        return SectionMapper.MAPPER.sectionAndQuestionsDto(section, questionRepository.findAllBySectionId(section.getId()));
    }

    public SectionDto update(UUID id, SectionUpdateDto dto) throws SectionNotFoundException {
        var section = sectionRepository.findById(id).orElseThrow(SectionNotFoundException::new);
        section.setTitle(dto.getTitle());
        if (dto.getDescription() != null) {
            section.setDescription(dto.getDescription());
        }
        return SectionMapper.MAPPER.modelToDto(sectionRepository.save(section));
    }
}
