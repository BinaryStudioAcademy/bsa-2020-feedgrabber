package com.feed_grabber.core.invitation;

import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.invitation.dto.InvitationDto;
import com.feed_grabber.core.invitation.dto.InvitationGenerateRequestDto;
import com.feed_grabber.core.invitation.dto.InvitationGenerateResponseDto;
import com.feed_grabber.core.invitation.dto.InvitationSignUpDto;
import com.feed_grabber.core.invitation.exceptions.InvitationAlreadyExistsException;
import com.feed_grabber.core.invitation.exceptions.InvitationNotFoundException;
import com.feed_grabber.core.invitation.exceptions.InvitationUserAlreadyExistsException;
import com.feed_grabber.core.invitation.model.Invitation;
import com.feed_grabber.core.rabbit.Sender;
import com.feed_grabber.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InvitationService {

    @Value("${invitation.duration.days}")
    private Integer INVITATION_DURATION_DAYS;

    @Value("${client.host}")
    private String CLIENT_HOST;

    private final InvitationRepository invitationRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final Sender emailSender;

    @Autowired
    public InvitationService(InvitationRepository invitationRepository,
                             CompanyRepository companyRepository,
                             UserRepository userRepository,
                             Sender emailSender) {
        this.invitationRepository = invitationRepository;
        this.companyRepository = companyRepository;
        this.userRepository =userRepository;
        this.emailSender = emailSender;
    }

    public InvitationSignUpDto getById(UUID id) throws InvitationNotFoundException {
        var invitation = invitationRepository.findById(id)
                .orElseThrow(InvitationNotFoundException::new);

        var dto = InvitationMapper.MAPPER.invitationToInvitationSignUpDto(invitation);
        dto.setExpired(isExpired(invitation));
        return dto;
    }

    public List<InvitationDto> getByCompanyId(UUID companyId) {
        return invitationRepository
                .findByCompanyIdOrderByAcceptedAscCreatedAtDesc(companyId)
                .stream()
                .map(i -> InvitationMapper.MAPPER.invitationToDto(i, isExpired(i)))
                .collect(Collectors.toList());
    }

    public InvitationGenerateResponseDto generate(InvitationGenerateRequestDto dto)
            throws CompanyNotFoundException, InvitationAlreadyExistsException, InvitationUserAlreadyExistsException {

        var company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(CompanyNotFoundException::new);
        var existingInvitation = invitationRepository.findByCompanyIdAndEmail(
                dto.getCompanyId(), dto.getEmail()
        );
        if (existingInvitation.isPresent()) {
            throw new InvitationAlreadyExistsException();
        }

        var existingUser = userRepository.findByCompanyIdAndEmail(company.getId(), dto.getEmail());
        if (existingUser.isPresent()) {
            throw new InvitationUserAlreadyExistsException();
        }

        var invitation = InvitationMapper.MAPPER.invitationDtoToModel(dto);
        invitation = invitationRepository.save(invitation);
        emailSender.sendToProcessor(
                CLIENT_HOST + "/sign-up/" + invitation.getId().toString(),
                invitation.getEmail(),
                "INVITE"
        );
        return InvitationMapper.MAPPER.invitationToGenerateDto(invitation);
    }

    public InvitationGenerateResponseDto reGenerate(InvitationGenerateRequestDto dto)
            throws CompanyNotFoundException, InvitationAlreadyExistsException, InvitationUserAlreadyExistsException {

        deleteByCompanyIdAndEmail(dto.getCompanyId(), dto.getEmail());
        return generate(dto);
    }

    public void deleteByCompanyIdAndEmail(UUID companyId, String email) {
        invitationRepository.deleteByCompanyIdAndEmail(companyId, email);
    }

    public boolean isExpired(Invitation invitation) {
        var calendar = Calendar.getInstance();
        calendar.setTime(invitation.getCreatedAt());
        calendar.add(Calendar.DAY_OF_MONTH, INVITATION_DURATION_DAYS);

        return calendar.getTime().before(new Date());
    }
}
