package com.feed_grabber.core.dashboard;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.dashboard.dto.DashboardDto;
import com.feed_grabber.core.dashboard.dto.UserInfo;
import com.feed_grabber.core.questionnaire.QuestionnaireMapper;
import com.feed_grabber.core.questionnaire.QuestionnaireRepository;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDashboardDto;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.request.RequestMapper;
import com.feed_grabber.core.request.RequestRepository;
import com.feed_grabber.core.request.dto.RequestDashboardDto;
import com.feed_grabber.core.team.TeamRepository;
import com.feed_grabber.core.user.UserRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    final private UserRepository userRepository;

    final private RequestRepository requestRepository;

    final private TeamRepository teamRepository;

    final private CompanyRepository companyRepository;

    final private QuestionnaireRepository questionnaireRepository;

    public DashboardService(UserRepository userRepository, RequestRepository requestRepository, TeamRepository teamRepository, CompanyRepository companyRepository, QuestionnaireRepository questionnaireRepository) {
        this.userRepository = userRepository;
        this.requestRepository = requestRepository;
        this.teamRepository = teamRepository;
        this.companyRepository = companyRepository;
        this.questionnaireRepository = questionnaireRepository;
    }

    public List<UserInfo> getUsers(UUID companyId) {
        return userRepository.getUserInfo(companyId).stream()
                .peek(u -> u.setReports(findByUserId(u.getId())))
                .collect(Collectors.toList());
    }

    public List<RequestDashboardDto> findByUserId(UUID userId) {
        return requestRepository.findByTargetUserIdAndCloseDateIsNotNull(userId)
                .stream()
                .map(RequestMapper.MAPPER::requestToDashboardDto)
                .collect(Collectors.toList());
    }

    public List<QuestionnaireDashboardDto> getQuestionnaires(UUID companyId) {
        return questionnaireRepository.findAllByCompanyIdAndClosedRequests(companyId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private QuestionnaireDashboardDto mapToDto(Questionnaire questionnaire) {
        var reports = questionnaire.getRequests().stream()
                .filter(q -> q.getCloseDate() != null)
                .map(RequestMapper.MAPPER::requestToDashboardDto)
                .collect(Collectors.toList());
        var result = QuestionnaireMapper.MAPPER.questionnaireToDashboardDto(questionnaire);
        result.setReports(reports);
        return result;
    }

    @SneakyThrows
    public DashboardDto getData() {
        var companyId = TokenService.getCompanyId();
        return new DashboardDto(
                companyRepository.findById(companyId).orElseThrow(CompanyNotFoundException::new).getName(),
                getUsers(companyId),
                getQuestionnaires(companyId),
                teamRepository.findAllByCompanyId(companyId, Pageable.unpaged())
        );
    }
}
