package com.feed_grabber.core.login.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Aleksandr Karpachov
 * @version 1.0
 * @since 04.08.2020
 */

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TemporaryUser {
    private String name;
    private String email;
    private String password;
}
