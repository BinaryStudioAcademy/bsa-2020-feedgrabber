package com.feed_grabber.core.dashboard;


import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.dashboard.dto.DashboardDto;
import com.feed_grabber.core.dashboard.dto.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    DashboardService service;

    @GetMapping
    public AppResponse<DashboardDto> test(){
        return new AppResponse<>(service.getData());
    }
}
