package com.feed_grabber.core.login.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class TemporaryUser {
    private String name;
    private String email;
    private String password;
}
