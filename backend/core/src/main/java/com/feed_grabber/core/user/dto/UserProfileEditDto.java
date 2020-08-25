package com.feed_grabber.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserProfileEditDto {
    @NotNull
    private UUID userId;
    @NotNull
    private String userName;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;

    private String phoneNumber;
    private String avatar;
}
