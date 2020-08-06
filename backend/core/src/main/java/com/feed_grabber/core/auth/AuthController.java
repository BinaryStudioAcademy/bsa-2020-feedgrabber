package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/renovate")
    @ResponseStatus(HttpStatus.CREATED)
    public TokenRefreshResponseDTO renovate(@RequestBody TokenRefreshRequestDTO token) throws Exception {
        return authService.refresh(token.getToken());
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthUserDTO register(@RequestBody UserRegisterDTO userRegisterDTO) throws Exception {
        return authService.registerUser(userRegisterDTO);
    }

//    @PostMapping("/login")
//    @ResponseStatus(HttpStatus.OK)
//    public AuthUserDTO login(@RequestBody UserLoginDTO userLoginDTO) throws Exception {
//        return authService.login(userLoginDTO, Optional.empty());
//    }

}
