package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.UserRegisterDTO;
import com.feed_grabber.core.auth.dto.UserRegisterInvitationDTO;
import com.feed_grabber.core.auth.exceptions.InvitationExpiredException;
import com.feed_grabber.core.auth.exceptions.CorporateEmailException;
import com.feed_grabber.core.auth.exceptions.PasswordNotValidException;
import com.feed_grabber.core.company.exceptions.CompanyAlreadyExistsException;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.company.exceptions.WrongCompanyNameException;
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

    public UUID registerUser(UserRegisterDTO userRegisterDTO) throws WrongCompanyNameException, CompanyAlreadyExistsException {
        validatePassword(userRegisterDTO.getPassword());
        userRegisterDTO.setPassword(bCryptPasswordEncoder.encode(userRegisterDTO.getPassword()));
        return userService.createDefault(userRegisterDTO);
    }

    public UUID registerUserByInvitation(UserRegisterInvitationDTO dto) throws InvitationNotFoundException, InvitationExpiredException {
        validatePassword(dto.getPassword());
        dto.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
        return userService.createInCompany(dto);
    }

    public UUID registerUserByEmail(UserRegisterDTO userRegisterDTO)
            throws CompanyNotFoundException, CorporateEmailException {
        validatePassword(userRegisterDTO.getPassword());
        userRegisterDTO.setPassword(bCryptPasswordEncoder.encode(userRegisterDTO.getPassword()));
        return userService.createInCompanyByEmail(userRegisterDTO);
    }

    private void validatePassword(String password) {
        if (password.length() < 8 || password.length() >= 16) {
            throw new PasswordNotValidException("Password length must be in range 8-16");
        }
    }
}
