package com.feed_grabber.core.team;

import com.feed_grabber.core.apiContract.DataList;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.team.dto.*;

import com.feed_grabber.core.team.exceptions.TeamNotFoundException;
import com.feed_grabber.core.team.exceptions.TeamUserLeadNotFoundException;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.UUID;

import static com.feed_grabber.core.role.RoleConstants.*;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    TeamService service;

    @ApiOperation("Get all teams")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<DataList<TeamShortDto>> getAll(@RequestParam Integer page,
                                                      @RequestParam Integer size) {
        var companyId = TokenService.getCompanyId();
        return new AppResponse<>(new DataList<>(
                service.getAllByCompany_Id(companyId, page, size),
                service.countAllByCompanyId(companyId),
                page,
                size
        ));
    }

    @ApiOperation("Get the team by id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<TeamDetailsDto> getOne(@PathVariable UUID id) throws TeamNotFoundException {
        var companyId = TokenService.getCompanyId();
        var userId = TokenService.getUserId();
        var role = TokenService.getRoleName();
        var team = service.getOne(companyId, id, userId, role);
        return new AppResponse<>(team);
    }

    @ApiOperation(value = "Create team", notes = "Provide name of the new team")
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<TeamDetailsDto> createTeam(@RequestBody RequestTeamDto teamDto) throws AlreadyExistsException {
        teamDto.setCompanyId(TokenService.getCompanyId());
        return new AppResponse<>(service.create(teamDto));
    }

    @ApiOperation(value = "Update team", notes = "Provide name of the new team")
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<TeamDto> update(@RequestBody RequestTeamDto teamDto) throws AlreadyExistsException, TeamNotFoundException {
        teamDto.setCompanyId(TokenService.getCompanyId());
        return new AppResponse<>(service.update(teamDto));
    }

    @ApiOperation("Toggle User")
    @PutMapping("/toggle_user")
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<ResponseUserTeamDto> toggle(@RequestBody RequestUserTeamDto requestDto) throws TeamNotFoundException, UserNotFoundException {
        requestDto.setCompanyId(TokenService.getCompanyId());
        return new AppResponse<>(service.toggleUser(requestDto));
    }

    @ApiOperation("Toggle Lead")
    @PutMapping("/toggle_lead")
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<ResponseTeamLeadDto> toggleLead(@RequestBody RequestTeamLeadDto requestDto) throws TeamNotFoundException, TeamUserLeadNotFoundException, UserNotFoundException {
        requestDto.setCompanyId(TokenService.getCompanyId());
        return new AppResponse<>(service.toggleLead(requestDto));
    }

    @ApiOperation("Delete User")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Secured(value = {ROLE_COMPANY_OWNER, ROLE_HR})
    public AppResponse<Boolean> delete(@PathVariable UUID id) {
        service.delete(id, TokenService.getCompanyId());
        return new AppResponse<>(true);
    }

}
