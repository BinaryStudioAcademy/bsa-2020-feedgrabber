package com.feed_grabber.core.data;

import com.feed_grabber.core.data.dto.DataDto;
import org.springframework.stereotype.Service;

@Service
public class DataService {
//    @Autowired
//    DataRepository dataRepository;

    public DataDto getData() {
        return new DataDto("Hello world!");
    }
}
