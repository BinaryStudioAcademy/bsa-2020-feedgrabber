package com.feed_grabber.core.user;

import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.feed_grabber.core.auth.security.TokenService.getUserId;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public AppResponse<UserDetailsResponseDTO> getUserDetails() {
        return new AppResponse<>(userService.getUserDetails(getUserId()).orElseThrow());
    }
}
