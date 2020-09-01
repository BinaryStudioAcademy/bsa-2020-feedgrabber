package com.feed_grabber.core.search.dto;

import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.report.dto.ReportDetailsDto;
import com.feed_grabber.core.team.dto.TeamDto;
import com.feed_grabber.core.user.dto.UserDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SearchDto {
private List<QuestionnaireDto> questionnaires;
private List<QuestionDto> questions;
private List<UserDto> users;
private List<TeamDto> teams;
private List<ReportDetailsDto> reports;
}
