package com.feed_grabber.core.invitation;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.invitation.dto.InvitationDto;
import com.feed_grabber.core.invitation.exceptions.InvitationNotFoundException;
import com.feed_grabber.core.response.AppResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/invitations")
public class InvitationController {

    private final InvitationService invitationService;

    @Autowired
    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping("/sign-up/{id}")
    public AppResponse<InvitationDto> getById(@PathVariable UUID id) throws InvitationNotFoundException {
        return new AppResponse<>(invitationService.getById(id));
    }

    @Secured("company_owner")
    @GetMapping
    public AppResponse<UUID> getByCompanyId() {
        var companyId = TokenService.getCompanyId();
        return new AppResponse<>(invitationService.getByCompanyId(companyId));
    }

    @Secured("company_owner")
    @PostMapping
    public AppResponse<UUID> generate() throws CompanyNotFoundException {
        var companyId = TokenService.getCompanyId();
        return new AppResponse<>(invitationService.generate(companyId));
    }

    @Secured("company_owner")
    @DeleteMapping
    public void delete() {
        var companyId = TokenService.getCompanyId();
        invitationService.deleteByCompanyId(companyId);
    }
}
