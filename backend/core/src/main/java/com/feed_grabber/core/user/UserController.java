package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.*;
import com.feed_grabber.core.exceptions.NotFoundException;


import java.util.UUID;


@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public AppResponse<UserDetailsResponseDTO> getUserDetails() {
        var id = TokenService.getUserId();
        return new AppResponse<>(userService.getUserDetails(id).orElseThrow(), HttpStatus.OK);
    }


}
