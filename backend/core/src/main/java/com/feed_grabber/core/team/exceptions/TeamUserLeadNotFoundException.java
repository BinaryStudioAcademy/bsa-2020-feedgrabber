package com.feed_grabber.core.team.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class TeamUserLeadNotFoundException extends NotFoundException {
    public TeamUserLeadNotFoundException() {
        super("The user is not in the team");
    }
}
