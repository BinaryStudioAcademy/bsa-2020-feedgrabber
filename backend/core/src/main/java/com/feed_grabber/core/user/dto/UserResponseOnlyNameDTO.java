package com.feed_grabber.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseOnlyNameDTO {
    private UUID id;
    private String email;
    private String username;
    private UUID companyId;
    private String companyName;

}
