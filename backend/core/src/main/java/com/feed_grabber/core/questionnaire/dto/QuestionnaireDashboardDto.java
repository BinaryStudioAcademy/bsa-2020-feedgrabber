package com.feed_grabber.core.questionnaire.dto;


import com.feed_grabber.core.request.dto.RequestDashboardDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class QuestionnaireDashboardDto {
    UUID id;
    String title;
    Boolean archived;
    List<RequestDashboardDto> reports;
}
