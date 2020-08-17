package com.feed_grabber.core.invitation.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;

public class InvitationNotFoundException extends NotFoundException {
    public InvitationNotFoundException() {
        super("Invitation Not Found");
    }
}
