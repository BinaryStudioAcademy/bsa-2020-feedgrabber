package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.AuthUserDTO;
import com.feed_grabber.core.auth.dto.TokenRefreshResponseDTO;
import com.feed_grabber.core.auth.dto.UserLoginDTO;
import com.feed_grabber.core.exceptions.WrongCredentialsException;
import com.feed_grabber.core.user.UserMapper;
import com.feed_grabber.core.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;


    public AuthService(TokenService tokenService, UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    public TokenRefreshResponseDTO refresh(String refreshToken) throws Exception {
        return tokenService.refreshTokens(refreshToken);
    }

    public AuthUserDTO login(UserLoginDTO dto) {
        try {
            var auth = new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword());

            authenticationManager.authenticate(auth);

        } catch (BadCredentialsException e) {
            throw new WrongCredentialsException("Incorrect username or password");
        }

        var user = userRepository
                                .findByUsername(dto.getUsername())
                                .map(UserMapper.MAPPER::responseFromUser).get();

        return new AuthUserDTO(tokenService.generateAccessToken(user.getId()),
                tokenService.generateRefreshToken(user.getId()), user);
    }

}
