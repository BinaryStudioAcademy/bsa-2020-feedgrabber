package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.UserRegisterDTO;
import com.feed_grabber.core.auth.dto.UserRegisterInvitationDTO;
import com.feed_grabber.core.auth.exceptions.UserAlreadyExistsException;
import com.feed_grabber.core.invitation.exceptions.InvitationNotFoundException;
import com.feed_grabber.core.user.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
public class RegisterService {
    private final UserService userService;
    private final PasswordEncoder bCryptPasswordEncoder;

    public RegisterService(UserService userService, PasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public UUID registerUser(UserRegisterDTO userRegisterDTO) {
        userRegisterDTO.setPassword(bCryptPasswordEncoder.encode(userRegisterDTO.getPassword()));

        try {
            return userService.createDefault(userRegisterDTO);
        } catch (Exception exception) {
            throw new UserAlreadyExistsException();
        }
    }

    public UUID registerUserByInvitation(UserRegisterInvitationDTO dto) throws InvitationNotFoundException {
        dto.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
        return userService.createInCompany(dto);
    }
}
