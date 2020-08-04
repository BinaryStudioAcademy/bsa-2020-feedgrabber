package com.feed_grabber.core.login.dto;

import lombok.Data;

/**
 * @author Aleksandr Karpachov
 * @version 1.0
 * @since 04.08.2020
 */
@Data
public class LoginDto {
    private String email;
    private String password;
}
