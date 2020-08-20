package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.AuthUserResponseDTO;
import com.feed_grabber.core.auth.dto.TokenValuesDto;
import com.feed_grabber.core.auth.dto.TokenRefreshResponseDTO;
import com.feed_grabber.core.auth.dto.UserLoginDTO;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.auth.exceptions.WrongCredentialsException;
import com.feed_grabber.core.user.UserMapper;
import com.feed_grabber.core.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    public final static String LOGIN_DIVIDER = "#";

    public AuthService(TokenService tokenService, UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    public TokenRefreshResponseDTO refresh(String refreshToken) {
        return tokenService.refreshTokens(refreshToken);
    }

    public AuthUserResponseDTO login(UserLoginDTO dto) {
        try {
            var username = this.generateUserName(dto.getUsername(), dto.getCompanyId());
            var upa = new UsernamePasswordAuthenticationToken(username, dto.getPassword());

            authenticationManager.authenticate(upa);

        } catch (BadCredentialsException e) {
            throw new WrongCredentialsException("Incorrect username or password");
        }

        var user = userRepository
                .findByUsernameAndCompanyId(dto.getUsername(), dto.getCompanyId())
                .map(UserMapper.MAPPER::responseFromUser).get();

        if(dto.getCompanyId() != null && !dto.getCompanyId().equals(user.getCompany().getId()) ) {
            throw new WrongCredentialsException("Incorrect username or password");
        }

        var tokenDto = new TokenValuesDto(user.getId(), user.getCompany().getId(), user.getRole());

        return new AuthUserResponseDTO(tokenService.generateAccessToken(tokenDto),
                tokenService.generateRefreshToken(tokenDto), user);
    }

    private String generateUserName(String username, UUID companyId) {
        return username + LOGIN_DIVIDER + companyId.toString();
    }
}

