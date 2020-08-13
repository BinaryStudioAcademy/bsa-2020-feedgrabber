package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import com.feed_grabber.core.user.dto.UserResetPassDto;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


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

    @ApiOperation(value = "Send an email to reset password")
    @PostMapping("/reset")
    public void sendEmailToResetPass(@RequestBody UserResetPassDto dto) {
        System.out.println(dto);
        // TODO: Send email
    }

}
