package com.feed_grabber.core.team.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;

public class TeamNotFoundException extends NotFoundException {
    public TeamNotFoundException() {
        super(Translator.toLocale("team_not_found"));
    }
}
