package com.feed_grabber.core.response.dto;

import com.feed_grabber.core.user.dto.UserDetailsReportDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDetailsDto {
    @NotNull
    private UUID id;

    @NotNull
    private UserDetailsReportDTO user;

    private LocalDateTime answeredAt;

    private String payload;
}
