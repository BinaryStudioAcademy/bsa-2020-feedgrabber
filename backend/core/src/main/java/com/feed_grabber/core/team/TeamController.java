package com.feed_grabber.core.team;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.team.dto.CreateTeamDto;
import com.feed_grabber.core.team.dto.TeamDto;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    TeamService service;

    @ApiOperation("Get all teams")

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<TeamDto>> getAll() {
        var companyId = TokenService.getCompanyId();
        var teams = service.getAllByCompany_Id(companyId);
        return new AppResponse<>(teams);
    }

    @ApiOperation("Create team")
    @PostMapping
    public AppResponse<TeamDto> createTeam(@RequestBody CreateTeamDto teamDto) throws CompanyNotFoundException, AlreadyExistsException {
        teamDto.setCompany_id(TokenService.getCompanyId());
        return new AppResponse(service.create(teamDto), HttpStatus.OK);
    }

}
