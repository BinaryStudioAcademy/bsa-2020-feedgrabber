package com.feed_grabber.core.team.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;

public class TeamExistsException extends AlreadyExistsException {
    public TeamExistsException() {
        super("Team with such company and title already exists");
    }
}
