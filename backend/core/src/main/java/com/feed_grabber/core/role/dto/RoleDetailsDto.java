package com.feed_grabber.core.role.dto;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.role.Role;
import com.feed_grabber.core.role.SystemRole;
import lombok.Value;

import java.util.UUID;

@Value
public class RoleDetailsDto {

    UUID id;

    String name;

    String description;

    SystemRole systemRole;

    Company company;

    public static RoleDetailsDto fromEntity(Role role) {
        return new RoleDetailsDto(role.getId()
                , role.getName()
                , role.getDescription()
                , role.getSystemRole()
                , role.getCompany()
        );
    }
}
