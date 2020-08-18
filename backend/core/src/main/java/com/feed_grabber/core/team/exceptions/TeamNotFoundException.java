package com.feed_grabber.core.team.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class TeamNotFoundException extends NotFoundException {
    public TeamNotFoundException() {
        super("Team not found");
    }
}
