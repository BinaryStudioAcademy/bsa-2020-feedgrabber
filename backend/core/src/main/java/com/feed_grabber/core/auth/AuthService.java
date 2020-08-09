package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.AuthUserDTO;
import com.feed_grabber.core.auth.dto.TokenRefreshResponseDTO;
import com.feed_grabber.core.auth.dto.UserLoginDTO;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.auth.exceptions.WrongCredentialsException;
import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.user.UserMapper;
import com.feed_grabber.core.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final AuthenticationManager authenticationManager;

    public AuthService(TokenService tokenService, UserRepository userRepository
            , CompanyRepository companyRepository, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.authenticationManager = authenticationManager;
    }

    public TokenRefreshResponseDTO refresh(String refreshToken) {
        return tokenService.refreshTokens(refreshToken);
    }

    public AuthUserDTO login(UserLoginDTO dto) {
        try {
            var upa = new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword());

            authenticationManager.authenticate(upa);

        } catch (BadCredentialsException e) {
            throw new WrongCredentialsException("Incorrect username or password");
        }

        var user = userRepository.findByUsername(dto.getUsername());
        var userResponseOnlyNameDTO = user.map(UserMapper.MAPPER::responseFromUser)
                .orElseThrow();

        Map<String, Object> claims = Map.of("companyId", user.orElseThrow().getRole().getCompany().getId());
        return new AuthUserDTO(tokenService.generateAccessToken(userResponseOnlyNameDTO.getId(), claims),
                tokenService.generateRefreshToken(userResponseOnlyNameDTO.getId(), claims), userResponseOnlyNameDTO);
    }

}
