package com.feed_grabber.core.user.dto;

import com.feed_grabber.core.company.dto.CompanyDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseAuthDetailsDTO {
    private UUID id;
    private String email;
    private String username;
    private String role;
    private CompanyDto company;
}
