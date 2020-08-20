package com.feed_grabber.core.response;

import com.amazonaws.services.kms.model.NotFoundException;
import com.feed_grabber.core.request.RequestRepository;
import com.feed_grabber.core.response.dto.ResponseDto;
import com.feed_grabber.core.user.UserRepository;
import org.springframework.stereotype.Service;

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

    public void save(ResponseDto dto) throws NotFoundException {
        var user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        var request = requestRepository.findById(dto.getRequestId())
                .orElseThrow(() -> new NotFoundException("Request not found"));

        responseRepository.save(ResponseMapper.MAPPER.responseFromDto(dto, user, request));
    }
}
