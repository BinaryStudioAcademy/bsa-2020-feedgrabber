package com.feed_grabber.core.role.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class RoleAssignmentDto {
    UUID userId;
    UUID roleId;
}
