package com.feed_grabber.core.role;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

//TODO: edit company_id with CompanyDto and add it to builder

@Data
@NoArgsConstructor
public class RoleDto {
    private UUID id;
    private String name;
    private String description;
   //private final CompanyDto company_id;
}
