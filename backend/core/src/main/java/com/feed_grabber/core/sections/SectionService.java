package com.feed_grabber.core.sections;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.question.QuestionMapper;
import com.feed_grabber.core.question.QuestionRepository;
import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.sections.dto.SectionCreateDto;
import com.feed_grabber.core.sections.dto.SectionDto;
import com.feed_grabber.core.sections.dto.SectionQuestionsDto;
import com.feed_grabber.core.sections.dto.SectionUpdateDto;
import com.feed_grabber.core.sections.exception.SectionNotFoundException;
import com.feed_grabber.core.sections.model.Section;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
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

    public List<QuestionDto> getSectionQuestions(UUID sectionId) throws NotFoundException {
        return parseQuestions(sectionRepository.findById(sectionId));
    }

    private List<QuestionDto> parseQuestions(Optional<Section> section) throws NotFoundException {
        return section
                .map(Section::getQuestions)
                .map(q -> q.stream()
                        .map(q2 -> QuestionMapper.MAPPER.questionToQuestionDtoIndexed(q2.getQuestion(), q2.getOrderIndex()))
                        .sorted(Comparator.comparing(QuestionDto::getIndex))
                        .collect(Collectors.toList())
                )
                .orElseThrow(NotFoundException::new);
    }

    public List<QuestionDto> deleteQuestion(UUID sectionId, UUID questionId) throws NotFoundException {
        sectionRepository.deleteQuestion(sectionId, questionId);
        return parseQuestions(sectionRepository.findById(sectionId));
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
