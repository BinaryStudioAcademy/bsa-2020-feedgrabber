package com.feed_grabber.core.newsReaction.dto;

import com.feed_grabber.core.user.dto.UserShortDto;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Value
@AllArgsConstructor
public class ReactionDto {
    String emoji;
    Boolean reactedByCurrentUser;
    List<UserShortDto> reactedUsers;
}
