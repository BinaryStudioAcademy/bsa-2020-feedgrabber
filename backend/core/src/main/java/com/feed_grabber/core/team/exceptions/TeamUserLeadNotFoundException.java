package com.feed_grabber.core.team.exceptions;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.localization.Translator;

public class TeamUserLeadNotFoundException extends NotFoundException {
    public TeamUserLeadNotFoundException() {
        super(Translator.toLocale("user_not_in_team"));
    }
}
