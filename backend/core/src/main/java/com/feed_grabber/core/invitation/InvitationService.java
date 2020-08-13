package com.feed_grabber.core.invitation;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.invitation.InvitationRepository;
import com.feed_grabber.core.invitation.dto.InvitationDto;
import com.feed_grabber.core.invitation.exceptions.InvitationNotFoundException;
import com.feed_grabber.core.invitation.model.Invitation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationService {
    private final InvitationRepository invitationRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public InvitationService(InvitationRepository invitationRepository,
                             CompanyRepository companyRepository) {
        this.invitationRepository = invitationRepository;
        this.companyRepository = companyRepository;
    }

    public InvitationDto getById(UUID id) throws InvitationNotFoundException {
        var invitation = invitationRepository.findById(id)
                .orElseThrow(InvitationNotFoundException::new);

        return InvitationMapper.MAPPER.invitationToInvitationDto(invitation);
    }

    public UUID getByCompanyId(UUID companyId) {
        return invitationRepository
                .findByCompanyId(companyId)
                .map(Invitation::getId)
                .orElse(null);
    }

    public UUID generate(UUID companyId) throws CompanyNotFoundException {
        var company = companyRepository.findById(companyId)
                .orElseThrow(CompanyNotFoundException::new);
        invitationRepository.deleteByCompanyId(companyId);

        var invitation = new Invitation(null, company);
        invitation = invitationRepository.save(invitation);
        return invitation.getId();
    }

    public void deleteByCompanyId(UUID companyId) {
        invitationRepository.deleteByCompanyId(companyId);
    }
}
