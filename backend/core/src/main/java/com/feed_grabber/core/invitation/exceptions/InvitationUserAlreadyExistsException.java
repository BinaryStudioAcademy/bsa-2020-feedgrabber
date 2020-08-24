package com.feed_grabber.core.invitation.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;

public class InvitationUserAlreadyExistsException extends AlreadyExistsException {
    public InvitationUserAlreadyExistsException() {
        super("User with such email is already registered");
    }
}
