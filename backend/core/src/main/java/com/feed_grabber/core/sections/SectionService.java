package com.feed_grabber.core.sections;

import com.feed_grabber.core.question.QuestionRepository;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.sections.dto.SectionCreateDto;
import com.feed_grabber.core.sections.dto.SectionDto;
import com.feed_grabber.core.sections.dto.SectionQuestionsDto;
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

    @Autowired
    public SectionService(SectionRepository sectionRepository,
                          QuestionRepository questionRepository) {
        this.sectionRepository = sectionRepository;
        this.questionRepository = questionRepository;
    }

    public SectionDto create(SectionCreateDto createDto) {
        if (createDto.getTitle() == null) {
            createDto.setTitle("New section");
        }
        var section = SectionMapper.MAPPER.createDtoToModel(createDto);
        return SectionMapper.MAPPER.modelToDto(sectionRepository.save(section));
    }

    public List<SectionQuestionsDto> getByQuestionnaire(UUID id) {
        return sectionRepository.findByQuestionnaireId(id)
                .stream()
                .map(section ->
                        SectionMapper.MAPPER.sectionAndQuestionsDto(section, questionRepository.findAllBySectionId(section.getId())))
                .collect(Collectors.toList());
    }

    public SectionQuestionsDto addQuestion(UUID sectionId, UUID questionId) throws SectionNotFoundException, QuestionNotFoundException {
        var section = sectionRepository.findById(sectionId).orElseThrow(SectionNotFoundException::new);

        questionRepository.findById(questionId).orElseThrow(QuestionNotFoundException::new);

        sectionRepository.addQuestion(sectionId, questionId);

        return SectionMapper.MAPPER.sectionAndQuestionsDto(section, questionRepository.findAllBySectionId(section.getId()));
    }

    public SectionQuestionsDto deleteQuestion(UUID sectionId, UUID questionId) throws SectionNotFoundException, QuestionNotFoundException {
        var section = sectionRepository.findById(sectionId).orElseThrow(SectionNotFoundException::new);

        questionRepository.findById(questionId).orElseThrow(QuestionNotFoundException::new);

        sectionRepository.deleteQuestion(sectionId, questionId);

        return SectionMapper.MAPPER.sectionAndQuestionsDto(section, questionRepository.findAllBySectionId(section.getId()));
    }
}
