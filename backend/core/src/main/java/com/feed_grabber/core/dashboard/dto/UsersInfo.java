package com.feed_grabber.core.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsersInfo {
    Integer userCount;
    Integer ownerCount;
    Integer hrCount;
    Integer employeeCount;
}
