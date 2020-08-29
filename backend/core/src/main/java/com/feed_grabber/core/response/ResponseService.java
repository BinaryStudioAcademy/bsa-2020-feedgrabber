package com.feed_grabber.core.response;

import com.feed_grabber.core.response.dto.ResponseDto;
import com.feed_grabber.core.response.dto.ResponseUpdateDto;
import com.feed_grabber.core.response.dto.UserResponseShortDto;
import com.feed_grabber.core.response.exceptions.ResponseNotFoundException;
import com.feed_grabber.core.response.model.Response;
import com.feed_grabber.core.responseDeadline.exceptions.DeadlineExpiredException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResponseService {
    private final ResponseRepository responseRepository;

    public ResponseService(ResponseRepository responseRepository) {
        this.responseRepository = responseRepository;
    }

    public Optional<ResponseDto> getOneByRequestAndUser(UUID requestId, UUID userId) {
        var byRequestIdAndUserId = responseRepository.findByRequestIdAndUserId(requestId, userId);
        return Optional
                .of(ResponseMapper.MAPPER.responseToDto(byRequestIdAndUserId));
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
        response.setAnsweredAt(new Date());

        return Optional.of(ResponseMapper.MAPPER.responseToDto(responseRepository.save(response)));
    }

    public ResponseDto getById(UUID responseId) throws ResponseNotFoundException {
        return ResponseMapper
                .MAPPER.responseToDto(responseRepository.findById(responseId)
                        .orElseThrow(ResponseNotFoundException::new));
    }

    public List<UserResponseShortDto> getRespondents(UUID requestId) {
        return responseRepository.findRespondentsByRequestId(requestId);
    }
}
