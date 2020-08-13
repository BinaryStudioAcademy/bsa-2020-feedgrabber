package com.feed_grabber.core.team;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.team.dto.CreateTeamDto;
import com.feed_grabber.core.team.dto.TeamDto;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TeamController {

    @Autowired
    TeamService service;

    @ApiOperation("Get all teams")
    @GetMapping("/teams")
    public AppResponse<List<TeamDto>> getAll() {
        var companyId = TokenService.getCompanyId();
        var teams = service.getAllByCompany_Id(companyId);
        return new AppResponse<>(teams, HttpStatus.OK);
    }

    @ApiOperation("Get all teams")
    @PostMapping("/teams")
    public void getAll(@RequestBody CreateTeamDto teamDto) {
        System.out.println(teamDto);
        service.create();
    }

}
