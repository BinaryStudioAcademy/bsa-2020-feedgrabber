package com.feed_grabber.core.team;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.team.dto.TeamDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TeamController {

    @Autowired
    TeamService service;

    @GetMapping("/teams")
    public AppResponse<List<TeamDto>> getAll() {
        var companyId = TokenService.getCompanyId();
        var teams = service.getAllByCompany_Id(companyId);
        return new AppResponse<>(teams, HttpStatus.OK);
    }

}
