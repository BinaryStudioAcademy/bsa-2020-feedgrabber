package com.feed_grabber.core.team.dto;

import com.feed_grabber.core.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.util.List;
import java.util.UUID;

@Data
@ToString
@AllArgsConstructor
public class CreateTeamDto {
    UUID id;
    String name;
    UUID company_id;
    List<UUID> memberIds;
}
