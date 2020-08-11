package com.feed_grabber.core.responseAnswer;

import com.feed_grabber.core.responseAnswer.model.ResponseAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResponseAnswerRepository extends JpaRepository<ResponseAnswer, UUID> {
    List<ResponseAnswer> findAllByResponseId(UUID responseId);

    List<ResponseAnswer> findAllByQuestionId(UUID questionId);

    Optional<ResponseAnswer> findByResponseIdAndQuestionId(UUID responseId, UUID questionId);
}
