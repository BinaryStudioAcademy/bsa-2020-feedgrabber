package com.feed_grabber.core.auth.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;

public class InvitationExpiredException extends AlreadyExistsException {
    public InvitationExpiredException() {
        super("Invitation has been expired");
    }
}
