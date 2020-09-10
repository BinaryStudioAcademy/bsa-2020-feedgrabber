package com.feed_grabber.core.dashboard.dto;


import com.feed_grabber.core.questionnaire.dto.QuestionnaireDashboardDto;
import com.feed_grabber.core.team.dto.TeamShortDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DashboardDto {
    String companyName;
    List<UserInfo> users;
    List<QuestionnaireDashboardDto> questionnaires;
    List<TeamShortDto> teams;
}
