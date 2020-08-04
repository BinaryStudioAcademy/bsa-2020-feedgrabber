package com.feed_grabber.core.role;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

//TODO: edit company_id with CompanyDto and add it to builder

@Data
@Builder
public class RoleDto {
    private final UUID id;
    private final String name;
    private final String description;
   //private final CompanyDto company_id;

    public static RoleDto fromEntity(Role role) {
        return RoleDto
                .builder()
                .id(role.getId())
                .name(role.getName())
                .description(role.getDescription())
                .build();
    }
}
