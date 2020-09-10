package com.feed_grabber.core.auth.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.localization.Translator;

public class InvitationExpiredException extends AlreadyExistsException {
    public InvitationExpiredException() {
        super(Translator.toLocale("invitation_expired"));
    }
}
