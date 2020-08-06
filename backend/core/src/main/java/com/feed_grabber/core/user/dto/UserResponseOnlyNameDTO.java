package com.feed_grabber.core.user.dto;

import com.feed_grabber.core.user.model.User;
import lombok.Data;
import lombok.AllArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UserResponseOnlyNameDTO {
    UUID id;
    String email;
    String username;

    public static UserResponseOnlyNameDTO fromEntity(User user) {
        return new UserResponseOnlyNameDTO(user.getId(), user.getEmail(), user.getUsername());
    }
}
