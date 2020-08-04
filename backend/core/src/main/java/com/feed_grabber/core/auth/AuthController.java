package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.TokenRenovationRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/renovate")
    public TokenRenovationRequestDTO renovate(@RequestBody TokenRenovationRequestDTO token) throws Exception {
        return authService.renovate(token.getToken());
    }
}
