package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.*;
import com.feed_grabber.core.register.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final RegisterService registerService;

    public AuthController(AuthService authService, RegisterService registerService) {
        this.authService = authService;
        this.registerService = registerService;
    }


    @PostMapping("/renovate")
    @ResponseStatus(HttpStatus.CREATED)
    public TokenRefreshResponseDTO renovate(@RequestBody TokenRefreshRequestDTO token) throws Exception {
        return authService.refresh(token.getToken());
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthUserDTO register(@RequestBody UserRegisterDTO userRegisterDTO) {
        return registerService.registerUser(userRegisterDTO);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AuthUserDTO login(@RequestBody UserLoginDTO userLoginDTO) {
        return authService.login(userLoginDTO);
    }

}
