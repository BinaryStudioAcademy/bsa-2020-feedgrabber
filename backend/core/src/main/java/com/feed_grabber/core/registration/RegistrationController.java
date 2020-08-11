package com.feed_grabber.core.registration;

import com.feed_grabber.core.registration.exceptions.VerificationTokenExpiredException;
import com.feed_grabber.core.registration.exceptions.VerificationTokenNotFoundException;
import com.feed_grabber.core.registration.dto.ConfirmRegistrationResponseDto;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/register")
public class RegistrationController {

    @Autowired
    VerificationTokenService verificationTokenService;

    @ApiOperation(value = "Verify user by token", notes = "Provide the token " +
            "to verify the registration of new user")
    @PutMapping("/confirm")
    public ConfirmRegistrationResponseDto confirmRegistration(
            @RequestParam(name="token", required = true) String token)
            throws VerificationTokenNotFoundException, VerificationTokenExpiredException {
            verificationTokenService.verifyUserByToken(token);
            return new ConfirmRegistrationResponseDto(true);
    }
}
