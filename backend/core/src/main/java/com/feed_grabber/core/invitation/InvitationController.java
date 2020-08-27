package com.feed_grabber.core.invitation;

import com.feed_grabber.core.auth.exceptions.JwtTokenException;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.invitation.dto.InvitationDto;
import com.feed_grabber.core.invitation.dto.InvitationGenerateRequestDto;
import com.feed_grabber.core.invitation.dto.InvitationGenerateResponseDto;
import com.feed_grabber.core.invitation.dto.InvitationSignUpDto;
import com.feed_grabber.core.invitation.exceptions.InvitationAlreadyExistsException;
import com.feed_grabber.core.invitation.exceptions.InvitationNotFoundException;
import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.invitation.exceptions.InvitationUserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.feed_grabber.core.role.RoleConstants.ROLE_COMPANY_OWNER;

@RestController
@RequestMapping("/api/invitations")
public class InvitationController {

    private final InvitationService invitationService;

    @Autowired
    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping("/sign-up/{id}")
    public AppResponse<InvitationSignUpDto> getById(@PathVariable UUID id) throws InvitationNotFoundException {
        return new AppResponse<>(invitationService.getById(id));
    }

    @GetMapping
    @Secured(value = {ROLE_COMPANY_OWNER})
    public AppResponse<List<InvitationDto>> getByCompanyId() {
        var companyId = TokenService.getCompanyId();
        return new AppResponse<>(invitationService.getByCompanyId(companyId));
    }

    @PostMapping
    @Secured(value = {ROLE_COMPANY_OWNER})
    public AppResponse<InvitationGenerateResponseDto> generate(@RequestBody InvitationGenerateRequestDto dto)
            throws CompanyNotFoundException, InvitationAlreadyExistsException, InvitationUserAlreadyExistsException {
        dto.setCompanyId(TokenService.getCompanyId());
        return new AppResponse<>(invitationService.generate(dto));
    }

    @PostMapping("/resend")
    @Secured(value = {ROLE_COMPANY_OWNER})
    public AppResponse<InvitationGenerateResponseDto> reGenerate(@RequestBody InvitationGenerateRequestDto dto)
            throws CompanyNotFoundException, InvitationAlreadyExistsException, InvitationUserAlreadyExistsException {
        dto.setCompanyId(TokenService.getCompanyId());
        return new AppResponse<>(invitationService.reGenerate(dto));
    }

    @DeleteMapping
    @Secured(value = {ROLE_COMPANY_OWNER})
    public void delete(@RequestParam String email) {
        var companyId = TokenService.getCompanyId();
        invitationService.deleteByCompanyIdAndEmail(companyId, email);
    }

    private void assertCompanyOwner() {
        if (!TokenService.getRoleName().equals("company_owner")) {
            throw new JwtTokenException("Only company owner could manage invitations");
        }
    }
}
