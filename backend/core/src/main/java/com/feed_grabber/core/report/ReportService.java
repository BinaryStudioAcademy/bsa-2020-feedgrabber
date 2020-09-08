package com.feed_grabber.core.report;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.rabbit.Receiver;
import com.feed_grabber.core.rabbit.Sender;
import com.feed_grabber.core.report.dto.ReportDetailsDto;
import com.feed_grabber.core.report.dto.ReportShortDto;
import com.feed_grabber.core.request.RequestRepository;
import com.feed_grabber.core.request.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import static com.feed_grabber.core.role.RoleConstants.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReportService {
    private final RequestRepository requestRepository;
    private final RestTemplate template = new RestTemplate();
    private final Sender sender;

    @Value("${ep.host}")
    private String EP;

    @Autowired
    public ReportService(RequestRepository requestRepository, Sender sender) {
        this.requestRepository = requestRepository;
        this.sender = sender;
    }

    public ReportDetailsDto getDataForReport(UUID requestId) throws NotFoundException {
        var request = requestRepository.findById(requestId).orElseThrow(NotFoundException::new);
        return ReportMapper.MAPPER.requestToReportDetails(request);
    }

    public boolean isRequestClosed(UUID requestId) {
        return requestRepository.existsByCloseDateIsNotNullAndId(requestId);
    }

    public String generateReport(UUID requestId) throws NotFoundException, JsonProcessingException {
        var body = new ObjectMapper().writeValueAsString(getDataForReport(requestId));
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return template.postForObject(EP.concat("/report"), new HttpEntity<>(body, headers), String.class);
    }

    public String getReport(UUID requestId) {
        return template.getForObject(EP +"/report/"+requestId, String.class);
    }

    public void hasAccess(UUID requestId, UUID userId, String role) {
        if (role.equals(ROLE_COMPANY_OWNER) || role.equals(ROLE_HR)) {
            return;
        }

        var request = requestRepository.findById(requestId).orElseThrow();

        if (request.getTargetUser() == null) {
            throwNoPermissions();
        }

        // employee could see if he is target, and received it
        if (request.getTargetUser().getId().equals(userId)) {
            if (request.getSendToTarget()) {
                return;
            } else {
                throwNoPermissions();
            }
        }

        // or he is a team lead of target user
        if (!requestRepository.isTeamLeadOfTargetUser(request.getTargetUser().getId(), userId)) {
            throwNoPermissions();
        }
    }

    private void throwNoPermissions() {
        throw new AccessDeniedException("You have not enough permissions to view this report");
    }

    public List<ReportShortDto> getAllAvailableReports(final UUID userId, final String role, final UUID comanyId) {
        List<Request> reports;
        switch (role) {
            case ROLE_COMPANY_OWNER:
            case ROLE_HR:
                reports = requestRepository.findAllReports(comanyId);
                break;
            case ROLE_EMPLOYEE:
                reports = requestRepository.findReportsForEmployee(userId);
                break;
            default:
                return null;
        }
        return reports.stream()
                .map(ReportMapper.MAPPER::requestToReportShort)
                .collect(Collectors.toList());
    }
}
