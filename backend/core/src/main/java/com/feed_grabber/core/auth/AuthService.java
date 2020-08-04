package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.TokenRenovationRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private TokenService tokenService;

    @Autowired
    public AuthService(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    public TokenRenovationRequestDTO renovate(String renovationToken) throws Exception {
        return new TokenRenovationRequestDTO(tokenService.renovateToken(renovationToken));
    }
}
