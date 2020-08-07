package com.feed_grabber.core.register;

import com.feed_grabber.core.auth.dto.UserRegisterDTO;
import com.feed_grabber.core.exceptions.UserAlreadyExistsException;
import com.feed_grabber.core.user.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class RegisterService {

    private final UserService userService;
    private final PasswordEncoder bCryptPasswordEncoder;

    public RegisterService(UserService userService, PasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void registerUser(UserRegisterDTO userRegisterDTO)  {
        userRegisterDTO.setPassword(bCryptPasswordEncoder.encode(userRegisterDTO.getPassword()));

        try {
           userService.createDefault(userRegisterDTO);
        } catch (Exception exception) {
            throw new UserAlreadyExistsException();
        }
    }
}
