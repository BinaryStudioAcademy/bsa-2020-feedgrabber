package com.feed_grabber.core.register;

import com.feed_grabber.core.auth.AuthService;
import com.feed_grabber.core.auth.dto.AuthUserDTO;
import com.feed_grabber.core.auth.dto.UserLoginDTO;
import com.feed_grabber.core.auth.dto.UserRegisterDTO;
import com.feed_grabber.core.exceptions.UserAlreadyExistsException;
import com.feed_grabber.core.user.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegisterService {

    private final UserService userService;
    private final PasswordEncoder bCryptPasswordEncoder;
    private final AuthService authService;

    public RegisterService(UserService userService, PasswordEncoder bCryptPasswordEncoder, AuthService authService) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authService = authService;
    }

    public AuthUserDTO registerUser(UserRegisterDTO userRegisterDTO)  {
        userRegisterDTO.setPassword(bCryptPasswordEncoder.encode(userRegisterDTO.getPassword()));
        try {
            return authService.login(new UserLoginDTO(userRegisterDTO.getPassword(), userRegisterDTO.getUsername())
                    , Optional.of(userService.createDefault(userRegisterDTO)));
        }catch (Exception exception){
            throw new UserAlreadyExistsException();
        }
    }
}
