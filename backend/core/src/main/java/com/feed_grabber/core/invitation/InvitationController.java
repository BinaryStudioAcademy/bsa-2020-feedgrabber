package com.feed_grabber.core.invitation;

import com.feed_grabber.core.auth.exceptions.JwtTokenException;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.invitation.dto.InvitationDto;
import com.feed_grabber.core.invitation.exceptions.InvitationNotFoundException;
import com.feed_grabber.core.apiContract.AppResponse;
import org.springframework.beans.factory.annotation.Autowired;
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

//    @GetMapping("/sign-up/{id}")
//    public AppResponse<InvitationDto> getById(@PathVariable UUID id) throws InvitationNotFoundException {
//        return new AppResponse<>(invitationService.getById(id));
//    }

//    @GetMapping
//    public AppResponse<UUID> getByCompanyId() {
//        assertCompanyOwner();
//        var companyId = TokenService.getCompanyId();
//        return new AppResponse<>(invitationService.getByCompanyId(companyId));
//    }

//    @PostMapping
//    public AppResponse<UUID> generate() throws CompanyNotFoundException {
//        assertCompanyOwner();
//        var companyId = TokenService.getCompanyId();
//        return new AppResponse<>(invitationService.generate(companyId));
//    }

//    @DeleteMapping
//    public void delete() {
//        assertCompanyOwner();
//        var companyId = TokenService.getCompanyId();
//        invitationService.deleteByCompanyId(companyId);
//    }

    private void assertCompanyOwner() {
        if (!TokenService.getRoleName().equals("company_owner")){
            throw new JwtTokenException("Only company owner could manage invitations");
        }
    }
}
