package com.feed_grabber.core.dashboard.dto;

import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.user.dto.UserShortDto;
import com.feed_grabber.core.user.model.User;

import java.util.List;

public class UserInfo {
    User user;
    List<Request> requests;
}
