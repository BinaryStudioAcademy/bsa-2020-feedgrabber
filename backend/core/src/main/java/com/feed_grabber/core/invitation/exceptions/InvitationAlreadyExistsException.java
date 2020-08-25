package com.feed_grabber.core.invitation.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;

public class InvitationAlreadyExistsException extends AlreadyExistsException {
    public InvitationAlreadyExistsException() {
        super("Invitation already sent");
    }
}
