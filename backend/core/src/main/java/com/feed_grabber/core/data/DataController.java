package com.feed_grabber.core.data;

import com.feed_grabber.core.data.dto.DataDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data")
public class DataController {
    @Autowired
    private DataService dataService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public DataDto getData() {
        return this.dataService.getData();
    }
}
