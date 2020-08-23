package com.feed_grabber.core.response;

import com.amazonaws.services.kms.model.NotFoundException;
import com.feed_grabber.core.request.RequestRepository;
import com.feed_grabber.core.response.dto.ResponseCreateDto;
import com.feed_grabber.core.response.dto.ResponseDto;
import com.feed_grabber.core.responseDeadline.exceptions.DeadlineExpiredException;
import com.feed_grabber.core.response.dto.ResponseUpdateDto;
import com.feed_grabber.core.response.exceptions.ResponseNotFoundException;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResponseService {
    private final ResponseRepository responseRepository;
    private final UserRepository userRepository;
    private final RequestRepository requestRepository;

    public ResponseService(ResponseRepository responseRepository, UserRepository userRepository,
                           RequestRepository requestRepository) {
        this.responseRepository = responseRepository;
        this.userRepository = userRepository;
        this.requestRepository = requestRepository;
    }

    public Optional<ResponseDto> getOneByRequestAndUser(UUID requestId, UUID userId) {
        return Optional
                .of(ResponseMapper.MAPPER.responseToDto(responseRepository.findByRequestAndUser(requestId, userId)));
    }

    public Optional<ResponseDto> update(ResponseUpdateDto dto) throws ResponseNotFoundException,
            DeadlineExpiredException {
        var response = responseRepository.findById(dto.getId()).orElseThrow(ResponseNotFoundException::new);
        var request = response.getRequest();

        if (Optional.ofNullable(request.getExpirationDate()).isPresent()
                && request.getExpirationDate().compareTo(new Date()) < 0) {
            throw new DeadlineExpiredException(request.getExpirationDate().toString());
        }
        response.setPayload(dto.getPayload());
        response.setAnsweredAt(LocalDateTime.now());

        return Optional.of(ResponseMapper.MAPPER.responseToDto(responseRepository.save(response)));
    }
}
