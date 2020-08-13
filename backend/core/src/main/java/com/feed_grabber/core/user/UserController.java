package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Get details from one user",
    notes = "You should not to provide an id, it will be got from token service")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<UserDetailsResponseDTO> getUserDetails() {
        var id = TokenService.getUserId();
        return new AppResponse<>(userService.getUserDetails(id).orElseThrow());
    }


}
