package com.feed_grabber.core.role.dto;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.role.Role;
import com.feed_grabber.core.role.SystemRole;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.util.UUID;

@Data
@NoArgsConstructor
public class RoleDetailsDto {

    private UUID id;

    private String name;

    private String description;

    private SystemRole systemRole;

    private Company company;
}
