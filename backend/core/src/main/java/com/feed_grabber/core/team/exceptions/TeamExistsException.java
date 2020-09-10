package com.feed_grabber.core.team.exceptions;

import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.localization.Translator;

public class TeamExistsException extends AlreadyExistsException {
    public TeamExistsException() {
        super(Translator.toLocale("team_exists"));
    }
}
