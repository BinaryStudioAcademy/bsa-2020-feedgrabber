package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.TokenRefreshRequestDTO;
import com.feed_grabber.core.auth.dto.TokenRefreshResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}
