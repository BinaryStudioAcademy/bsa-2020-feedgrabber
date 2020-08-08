package com.feed_grabber.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsResponseDTO {
    private UUID id;
    private String userName;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
