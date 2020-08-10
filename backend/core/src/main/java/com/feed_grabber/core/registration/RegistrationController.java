package com.feed_grabber.core.registration;

import com.feed_grabber.core.registration.dto.ConfirmRegistrationResponseDto;
import com.feed_grabber.core.registration.exceptions.VerificationTokenExpiredException;
import com.feed_grabber.core.registration.exceptions.VerificationTokenNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/register")
public class RegistrationController {

    @Autowired
    VerificationTokenService verificationTokenService;

    @PutMapping("/confirm")
    public ConfirmRegistrationResponseDto confirmRegistration(
            @RequestParam(name = "token", required = true) String token)
            throws VerificationTokenNotFoundException, VerificationTokenExpiredException {
        verificationTokenService.verifyUserByToken(token);
        return new ConfirmRegistrationResponseDto(true);
    }
}
