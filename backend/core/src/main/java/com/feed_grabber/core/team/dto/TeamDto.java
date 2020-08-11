package com.feed_grabber.core.team.dto;

import com.feed_grabber.core.company.dto.CompanyDto;
import com.feed_grabber.core.user.dto.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamDto {
    private UUID id;
    private String name;
    private CompanyDto company;
    private List<UserResponseDto> members;
}
