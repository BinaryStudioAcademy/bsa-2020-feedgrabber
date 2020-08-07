package com.feed_grabber.core.login;

import com.feed_grabber.core.login.dto.LoginDto;
import com.feed_grabber.core.login.model.TemporaryUser;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;


@Service
public class StubService {
    private List<TemporaryUser> users = new ArrayList<>();

    @PostConstruct
    private void init() {
        users.add(new TemporaryUser("admin", "adm@mail.com", "admin"));
    }

    public TemporaryUser auth(LoginDto dto) {
        for (var user: users) {
            if (user.getEmail().equals(dto.getEmail())
                    && user.getPassword().equals(dto.getPassword())) {
               return user;
            }
        }
        throw new WrongCredentialsException("wrong email or password");
    }
}
