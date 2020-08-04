package com.feed_grabber.core.Auth;

import com.feed_grabber.core.Auth.dto.UserRegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public void signUp(@RequestBody UserRegisterDto userRegisterDto) {
        authService.register(userRegisterDto);
    }
}
