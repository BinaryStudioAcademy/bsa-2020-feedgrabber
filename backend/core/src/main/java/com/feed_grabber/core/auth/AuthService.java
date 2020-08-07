package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.TokenRefreshResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final TokenService tokenService;

    public AuthService(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    public TokenRefreshResponseDTO refresh(String refreshToken) throws Exception {
        return tokenService.refreshTokens(refreshToken);
    }
}
