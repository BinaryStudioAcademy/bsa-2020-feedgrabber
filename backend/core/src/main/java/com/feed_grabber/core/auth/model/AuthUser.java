package com.feed_grabber.core.auth.model;

import org.springframework.security.core.userdetails.User;


import static java.util.Collections.emptyList;

public class AuthUser extends User {

    public AuthUser(String username, String password) {
        super(username, password, emptyList());
    }
}
