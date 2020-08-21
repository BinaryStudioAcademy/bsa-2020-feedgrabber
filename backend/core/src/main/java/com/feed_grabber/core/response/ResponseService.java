package com.feed_grabber.core.response;

import com.amazonaws.services.kms.model.NotFoundException;
import com.feed_grabber.core.request.RequestMapper;
import com.feed_grabber.core.request.RequestRepository;
import com.feed_grabber.core.response.dto.ResponseCreateDto;
import com.feed_grabber.core.response.dto.ResponseDto;
import com.feed_grabber.core.response.dto.ResponseUpdateDto;
import com.feed_grabber.core.response.exceptions.ResponseNotFoundException;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ResponseService {
    private final ResponseRepository responseRepository;
    private final UserRepository userRepository;
    private final RequestRepository requestRepository;

    public ResponseService(ResponseRepository responseRepository, UserRepository userRepository, RequestRepository requestRepository) {
        this.responseRepository = responseRepository;
        this.userRepository = userRepository;
        this.requestRepository = requestRepository;
    }

    public void save(ResponseCreateDto dto) throws NotFoundException {
        var user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));

        var request = requestRepository.findById(dto.getRequestId())
                .orElseThrow(() -> new NotFoundException("Request not found"));

        responseRepository.save(ResponseMapper.MAPPER.responseFromDto(dto, user, request));
    }

    public Optional<ResponseDto> getOneByRequestAndUser(UUID requestId, UUID userId) {
        return Optional.of(
                ResponseMapper.MAPPER.responseToDto(
                        responseRepository.findByRequestAndUser(requestId, userId)));
    }

    public Optional<ResponseDto> update(ResponseUpdateDto dto, UUID userId) throws ResponseNotFoundException, UserNotFoundException {
       var response = responseRepository.findById(dto.getId())
               .orElseThrow(ResponseNotFoundException::new);

       var user = userRepository.findById(userId)
               .orElseThrow(UserNotFoundException::new);

       response.setUser(user);
       response.setPayload(dto.getPayload());

       return Optional.of(ResponseMapper.MAPPER.responseToDto(responseRepository.save(response)));
    }
}
