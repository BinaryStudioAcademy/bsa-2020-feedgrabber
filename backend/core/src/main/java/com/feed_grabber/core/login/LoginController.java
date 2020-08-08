package com.feed_grabber.core.login;

import com.feed_grabber.core.login.dto.LoginDto;
import com.feed_grabber.core.login.dto.LoginResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    StubService authService;
    
    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginDto dto) {
        var user = authService.auth(dto);
        // to do
        // import TokenService from Auth
        // var token = tokenService.generateToken(userId)
        // var refreshedToken = tokenService.generateRenovationToken(userId)
        return new LoginResponseDto(user, "token", "refrToken");

    }

}
