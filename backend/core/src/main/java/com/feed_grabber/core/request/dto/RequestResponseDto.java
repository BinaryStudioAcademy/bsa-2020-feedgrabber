package com.feed_grabber.core.request.dto;

import com.feed_grabber.core.response.dto.ResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Data
public class RequestResponseDto {
    private UUID id;
    private List<ResponseDto> responses;
    private LocalDateTime expiredAt;
}
