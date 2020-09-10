package com.feed_grabber.core.sections;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.question.QuestionMapper;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.exceptions.QuestionNotFoundException;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.questionnaire.exceptions.QuestionnaireNotFoundException;
import com.feed_grabber.core.sections.dto.*;
import com.feed_grabber.core.sections.exception.SectionNotFoundException;
import com.feed_grabber.core.sections.model.Section;
import com.feed_grabber.core.sections.model.SectionQuestion;
import com.feed_grabber.core.sections.model.SectionQuestionId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SectionService {
    private final SectionRepository sectionRepository;
    private final QuestionnaireRepository questionnaireRepository;
    private final SectionIdsRepository sectionIdsRepository;

    @Autowired
    public SectionService(SectionRepository sectionRepository,
                          QuestionnaireRepository questionnaireRepository, SectionIdsRepository sectionIdsRepository) {
        this.sectionRepository = sectionRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.sectionIdsRepository = sectionIdsRepository;
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
                .map(SectionMapper.MAPPER::modelToExtendedDto)
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

    public void deleteQuestion(UUID sectionId, UUID questionId) throws NotFoundException {
        var index = sectionRepository.deleteQuestion(sectionId, questionId);
        sectionRepository.shiftIndexesLeft(sectionId, index);
    }

    public SectionDto update(UUID id, SectionUpdateDto dto) throws SectionNotFoundException {
        var section = sectionRepository.findById(id).orElseThrow(SectionNotFoundException::new);
        section.setTitle(dto.getTitle());
        if (dto.getDescription() != null) {
            section.setDescription(dto.getDescription());
        }
        return SectionMapper.MAPPER.modelToDto(sectionRepository.save(section));
    }

    @Transactional
    public void reorderQuestions(SectionsQuestionOrderDto dto) throws NotFoundException {
        var oldS = dto.getOldSection();
        var newS = dto.getNewSection();
        var oldI = dto.getOldIndex().intValue();
        var newI = dto.getNewIndex().intValue();

        if (oldS.equals(newS)) {
            var section = sectionRepository.findById(newS).orElseThrow(SectionNotFoundException::new);
            if (oldI < newI) {
                section.getQuestions().forEach(q -> {
                    var orderI = q.getOrderIndex().intValue();
                    if (orderI == oldI) {
                        q.setOrderIndex(newI);
                        return;
                    }
                    if (orderI > oldI && orderI <= newI) {
                        q.setOrderIndex(--orderI);
                    }
                });
            } else {
                section.getQuestions().forEach(q -> {
                    var orderI = q.getOrderIndex().intValue();
                    if (orderI == oldI) {
                        q.setOrderIndex(newI);
                        return;
                    }
                    if (orderI >= newI && orderI < oldI) {
                        q.setOrderIndex(++orderI);
                    }
                });
            }
            sectionRepository.save(section);
        } else {
            var oldSection = sectionRepository.findById(oldS).orElseThrow(SectionNotFoundException::new);
            var oldQs1 = oldSection.getQuestions();
            var newSection = sectionRepository.findById(newS).orElseThrow(SectionNotFoundException::new);
            var oldQs2 = newSection.getQuestions();

            var q = findByIndex(oldI, oldQs1);
            oldQs1.remove(q);

            oldQs1.forEach(qs -> {
                var orderI = qs.getOrderIndex().intValue();
                if (orderI > oldI) qs.setOrderIndex(--orderI);
            });

            oldQs2.forEach(qs -> {
                var orderI = qs.getOrderIndex().intValue();
                if (orderI >= newI) qs.setOrderIndex(++orderI);
            });

            oldQs1.addAll(oldQs2);
            sectionIdsRepository.saveAll(new ArrayList<>(oldQs1));
            sectionIdsRepository.moveQuestionToAnotherSection(q.getQuestion().getId(), oldS, newS, newI);
        }
    }

    private SectionQuestion findByIndex(Integer index, List<SectionQuestion> questions) throws NotFoundException {
        return questions.stream()
                .filter(q -> q.getOrderIndex().equals(index))
                .findFirst()
                .orElseThrow(QuestionNotFoundException::new);
    }
}
