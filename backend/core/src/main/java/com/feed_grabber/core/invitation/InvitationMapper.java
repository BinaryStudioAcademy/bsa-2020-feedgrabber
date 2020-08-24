package com.feed_grabber.core.invitation;

import com.feed_grabber.core.invitation.dto.InvitationDto;
import com.feed_grabber.core.invitation.dto.InvitationGenerateRequestDto;
import com.feed_grabber.core.invitation.dto.InvitationGenerateResponseDto;
import com.feed_grabber.core.invitation.dto.InvitationSignUpDto;
import com.feed_grabber.core.invitation.model.Invitation;
import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public abstract class InvitationMapper {
    public static InvitationMapper MAPPER = Mappers.getMapper(InvitationMapper.class);

    @Mapping(source = "company.name", target = "companyName")
    @Mapping(ignore = true, target = "expired")
    public abstract InvitationSignUpDto invitationToInvitationSignUpDto(Invitation invitation);

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(constant = "false", target = "accepted")
    public abstract Invitation invitationDtoToModel(InvitationGenerateRequestDto dto);

    public abstract InvitationGenerateResponseDto invitationToGenerateDto(Invitation invitation);

    @Mapping(source = "invitation.accepted", target = "accepted")
    @Mapping(source = "invitation.email", target = "email")
    @Mapping(source = "invitation.createdAt", target = "createdAt")
    @Mapping(source = "expired", target = "expired")
    public abstract InvitationDto invitationToDto(Invitation invitation, Boolean expired);
}
