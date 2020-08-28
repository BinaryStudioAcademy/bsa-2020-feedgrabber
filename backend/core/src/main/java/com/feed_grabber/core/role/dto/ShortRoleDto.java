package com.feed_grabber.core.role.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class ShortRoleDto {
    private UUID id;

    private String name;
}
