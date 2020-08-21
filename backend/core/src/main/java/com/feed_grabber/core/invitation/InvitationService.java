package com.feed_grabber.core.invitation;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.invitation.InvitationRepository;
import com.feed_grabber.core.invitation.dto.InvitationDto;
import com.feed_grabber.core.invitation.dto.InvitationGenerateRequestDto;
import com.feed_grabber.core.invitation.dto.InvitationGenerateResponseDto;
import com.feed_grabber.core.invitation.exceptions.InvitationAlreadyExistsException;
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

//    public InvitationDto getById(UUID id) throws InvitationNotFoundException {
//        var invitation = invitationRepository.findById(id)
//                .orElseThrow(InvitationNotFoundException::new);
//
//        return InvitationMapper.MAPPER.invitationToInvitationDto(invitation);
//    }
//
//    public UUID getByCompanyId(UUID companyId) {
//        return invitationRepository
//                .findByCompanyId(companyId)
//                .map(Invitation::getId)
//                .orElse(null);
//    }

    public InvitationGenerateResponseDto generate(InvitationGenerateRequestDto dto)
            throws CompanyNotFoundException, InvitationAlreadyExistsException {

        var company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);
        var existing = invitationRepository.findByCompanyIdAndEmail(
                dto.getCompanyId(), dto.getEmail()
        );
        if (existing.isPresent()) {
            throw new InvitationAlreadyExistsException();
        }

        var invitation = InvitationMapper.MAPPER.invitationDtoToModel(dto);
        invitation = invitationRepository.save(invitation);
        return InvitationMapper.MAPPER.invitationToDto(invitation);
    }

//    public void deleteByCompanyId(UUID companyId) {
//        invitationRepository.deleteByCompanyId(companyId);
//    }
}
