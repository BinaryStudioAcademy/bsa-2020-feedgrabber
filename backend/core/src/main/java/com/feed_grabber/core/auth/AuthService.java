package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.AuthUserDTO;
import com.feed_grabber.core.auth.dto.TokenRefreshResponseDTO;
import com.feed_grabber.core.auth.dto.UserLoginDTO;
import com.feed_grabber.core.auth.dto.UserRegisterDTO;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.UserService;
import com.feed_grabber.core.user.dto.UserResponseOnlyNameDTO;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final TokenService tokenService;
    private final UserService userService;
    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder bCryptPasswordEncoder;


    public AuthService(
            TokenService tokenService
            , UserService userService
            , UserRepository userRepository
            , AuthenticationManager authenticationManager
            , PasswordEncoder bCryptPasswordEncoder) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public TokenRefreshResponseDTO refresh(String refreshToken) throws Exception {
        return tokenService.refreshTokens(refreshToken);
    }

    public AuthUserDTO registerUser(UserRegisterDTO userRegisterDTO) throws Exception {
        userRegisterDTO.setPassword(bCryptPasswordEncoder.encode(userRegisterDTO.getPassword()));
        return login(new UserLoginDTO(userRegisterDTO.getPassword(), userRegisterDTO.getUsername())
                , Optional.of(userService.createDefault(userRegisterDTO)));

    }

    public AuthUserDTO login(UserLoginDTO userLoginDto, Optional<UserResponseOnlyNameDTO> userResponseOnlyNameDTO)
            throws Exception {
//        Authentication auth;
//        try {
//            auth = authenticationManager
//                    .authenticate(
//                            new UsernamePasswordAuthenticationToken(
//                                    userLoginDto.getUsername()
//                                    , userLoginDto.getPassword()
//                            )
//                    );
//        } catch (BadCredentialsException e) {
//            throw new Exception("Incorrect username or password", e);
//        }
//
//        var user = userResponseOnlyNameDTO
//                .orElse(UserResponseOnlyNameDTO
//                        .fromEntity(userRepository
//                                .findByUsername(userLoginDto.getUsername())
//                                .orElseThrow()
//                        )
//                );
//        var authDTO = new AuthUserDTO(
//                tokenService.generateAccessToken(user.getId())
//                , tokenService.generateRefreshToken(user.getId())
//                , user);
//        return authDTO;
        return null;
    }

}
