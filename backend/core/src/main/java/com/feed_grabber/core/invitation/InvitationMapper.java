package com.feed_grabber.core.invitation;

import com.feed_grabber.core.invitation.dto.InvitationDto;
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
    public abstract InvitationDto invitationToInvitationDto(Invitation question);
}
